# Telegram Sticker Bot — Spesifikasi Teknis

> Bot menerima foto → konversi otomatis ke `.webp` 512×512 → kirim balik sebagai stiker siap pakai.
> Serverless. Stateless. Gratis selamanya. Tanpa database. Tanpa storage.

---

## Daftar Isi

1. [Arsitektur Sistem](#arsitektur-sistem)
2. [Stack Teknologi](#stack-teknologi)
3. [Struktur Project](#struktur-project)
4. [Alur Eksekusi Webhook](#alur-eksekusi-webhook)
5. [Setup Webhook](#setup-webhook)
6. [Batasan Teknis](#batasan-teknis)
7. [Keamanan](#keamanan)
8. [Fitur Opsional](#fitur-opsional)
9. [Roadmap Pengerjaan](#roadmap-pengerjaan)
10. [Kenapa Gratis Selamanya](#kenapa-gratis-selamanya)

---

## Arsitektur Sistem

```
User kirim foto di Telegram
        │
        ▼
Telegram Server
        │  POST webhook event
        ▼
Vercel Serverless Function        ← satu-satunya "backend"
  /pages/api/webhook.js
        │
        ├─ 1. Validasi secret token
        ├─ 2. Download foto dari Telegram CDN  (binary → Buffer)
        ├─ 3. Sharp: resize 512×512 → encode .webp  (Buffer → Buffer)
        └─ 4. sendSticker multipart → Telegram Bot API
        │
        ▼
User terima stiker → tap & hold → Add to Favorites ⭐
```

> **Tidak ada database. Tidak ada disk I/O.**
> Buffer hidup hanya selama eksekusi function, lalu garbage collected.

---

## Stack Teknologi

| Layer | Pilihan | Alasan |
|---|---|---|
| **Framework** | Next.js (App Router) | Landing page + webhook handler satu project, zero-config deploy ke Vercel |
| **Image processing** | Sharp (Node.js / libvips) | Native .webp output, resize + fit contain, eksekusi <100ms, jauh lebih ringan dari Jimp atau Canvas |
| **Telegram integration** | Raw `fetch` ke Bot API | Hanya butuh 3 endpoint — library penuh seperti `node-telegram-bot-api` terlalu besar untuk kebutuhan ini |
| **Hosting** | Vercel Free Tier | 100 GB bandwidth/bulan, serverless invocation unlimited (fair use), cold start ~300ms |

---

## Struktur Project

```
/
├── app/
│   └── page.jsx                  ← Landing page + tombol "Start Bot" (opsional)
│
├── pages/api/
│   └── webhook.js                ← Inti bot, semua logik di sini
│
├── lib/
│   ├── telegram.js               ← Helper: getFile · downloadFile · sendSticker · sendMessage
│   └── imageProcessor.js         ← Sharp: resize 512×512 + encode .webp → return Buffer
│
├── .env.local
│   ├── BOT_TOKEN                 ← dari @BotFather
│   └── WEBHOOK_SECRET            ← random string untuk validasi setiap request masuk
│
└── vercel.json                   ← { "functions": { "pages/api/webhook.js": { "maxDuration": 10 } } }
```

---

## Alur Eksekusi Webhook

### Step 1 — Validasi Request

Setiap request yang masuk wajib punya header `X-Telegram-Bot-Api-Secret-Token` yang cocok dengan `WEBHOOK_SECRET`. Kalau tidak cocok, langsung tolak sebelum logik apapun berjalan.

```js
if (req.headers['x-telegram-bot-api-secret-token'] !== process.env.WEBHOOK_SECRET) {
  return res.status(401).end()
}
```

---

### Step 2 — Parse Update Telegram

Ambil body POST dari Telegram. Cek apakah `message.photo` ada. Kalau bukan foto, balas dengan pesan panduan dan return `200` supaya Telegram tidak retry.

```js
const { message } = req.body

if (!message?.photo) {
  await sendMessage(message.chat.id, 'Kirim foto ya! 📸')
  return res.status(200).end()
}
```

---

### Step 3 — Download Foto dari Telegram CDN

Array `photo[]` diurutkan dari resolusi kecil ke besar oleh Telegram. Ambil index terakhir (tertinggi). Hit `getFile` untuk dapat `file_path`, lalu download binary-nya langsung ke Buffer — tidak ditulis ke disk.

```js
const fileId   = message.photo.at(-1).file_id
const filePath = await getFile(fileId)       // → string path di CDN Telegram
const buffer   = await downloadFile(filePath) // → Buffer binary (jpg/png/heic)
```

---

### Step 4 — Proses Gambar In-Memory

Input Buffer (JPG/PNG/HEIC) masuk Sharp. Resize ke 512×512 dengan `fit: contain` + background transparan agar aspek rasio tidak rusak. Output ke Buffer `.webp`. Tidak ada file yang menyentuh disk.

```js
// lib/imageProcessor.js
import sharp from 'sharp'

export async function toStickerWebp(inputBuffer) {
  return sharp(inputBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp({ quality: 80 })
    .toBuffer() // → Buffer .webp
}
```

---

### Step 5 — Upload Stiker ke Telegram

POST ke endpoint `sendSticker` menggunakan `multipart/form-data`. Buffer `.webp` di-stream langsung tanpa disimpan ke file system. Telegram menerima, menyimpan, dan mengirim balik ke user.

```js
// lib/telegram.js
export async function sendSticker(chatId, webpBuffer) {
  const form = new FormData()
  form.append('chat_id', String(chatId))
  form.append('sticker', new Blob([webpBuffer], { type: 'image/webp' }), 'sticker.webp')

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendSticker`, {
    method: 'POST',
    body: form
  })
}
```

---

### Step 6 — Selesai

Buffer dibebaskan. Function selesai. User melihat stiker di chat dan bisa langsung **tap & hold → Add to Favorites**. Telegram yang handle storage permanen dari sini.

---

## Setup Webhook

Jalankan sekali via browser atau curl setelah deploy pertama. Tidak perlu diulang kecuali domain berubah.

```
GET https://api.telegram.org/bot{BOT_TOKEN}/setWebhook
  ?url=https://your-project.vercel.app/api/webhook
  &secret_token=WEBHOOK_SECRET_MU
```

Verifikasi webhook aktif:

```
GET https://api.telegram.org/bot{BOT_TOKEN}/getWebhookInfo
```

---

## Batasan Teknis

| Batasan | Detail | Kenapa Aman |
|---|---|---|
| **Timeout 10 detik** | Vercel Free Tier max 10s per function | Sharp selesai <300ms, download foto <1 detik, total jauh di bawah limit |
| **File size max 20 MB** | Telegram Bot API hanya bisa download file hingga 20 MB | Foto dari HP biasanya 2–5 MB, aman tanpa handling tambahan |
| **Format wajib `.webp`** | Telegram hanya terima stiker dalam format `.webp` | Sharp support `.webp` output native, tidak butuh konversi tambahan |
| **Dimensi max 512×512** | Aturan Telegram untuk ukuran stiker | Sharp `fit: contain` otomatis jaga aspek rasio, padding transparan di sisi yang lebih pendek |
| **Cold start ~300ms** | Vercel perlu warm-up function setelah idle | Tidak masalah — Telegram menunggu response hingga 60 detik sebelum retry |
| **Tanpa persistent disk** | Serverless function tidak punya disk permanen | Tidak diperlukan. Semua in-memory Buffer, dibuang setelah response selesai |

---

## Keamanan

- **Webhook secret token** — setiap request divalidasi via header `X-Telegram-Bot-Api-Secret-Token`. Request tanpa token yang valid langsung ditolak sebelum logik apapun berjalan.

- **Environment variables** — `BOT_TOKEN` dan `WEBHOOK_SECRET` disimpan di Vercel Environment Variables, tidak pernah di-commit ke repository.

- **Zero data retention** — tidak ada data user yang tersimpan di mana pun. Foto diproses di memory lalu dibuang. Log Vercel tidak menyimpan konten foto.

---

## Fitur Opsional

Semua fitur ini tetap stateless, tidak butuh database.

| Fitur | Cara Implementasi |
|---|---|
| **Background transparan** | Sharp `threshold()` + `flatten()` untuk approximate-remove background putih solid |
| **Overlay teks** | Sharp `composite()` dengan teks dari caption message user |
| **Mode padding** | Parse command `/sticker compact` atau `/sticker pad` sebelum proses gambar |
| **Landing page** | `app/page.jsx` dengan tombol "Start Bot" ke `t.me/namabotmu` |

---

## Roadmap Pengerjaan

```
01. [ ] Setup  — Buat bot via @BotFather → dapat BOT_TOKEN
02. [ ] Code   — Init project: npx create-next-app@latest, install sharp
03. [ ] Code   — Buat lib/telegram.js (getFile, downloadFile, sendSticker, sendMessage)
04. [ ] Code   — Buat lib/imageProcessor.js (toStickerWebp)
05. [ ] Code   — Buat pages/api/webhook.js (orkestrasi lengkap)
06. [ ] Setup  — Set BOT_TOKEN + WEBHOOK_SECRET di Vercel Environment Variables
07. [ ] Deploy — git push → Vercel auto-deploy → dapat URL production
08. [ ] Setup  — Hit setWebhook via browser dengan URL Vercel + secret token
09. [ ] Test   — Kirim foto ke bot, cek Vercel Function Logs jika ada error
```

---

## Kenapa Gratis Selamanya

**Vercel Free Tier** — 100 GB bandwidth/bulan, serverless invocation unlimited dengan fair use. Tidak ada biaya compute per jam atau per bulan selama tidak melebihi batas.

**Tanpa database** — tidak butuh Supabase, PlanetScale, atau Redis. State tidak perlu disimpan karena setiap request self-contained dari awal sampai akhir.

**Tanpa storage** — file tidak pernah menyentuh disk. Buffer hidup hanya selama eksekusi function lalu garbage collected secara otomatis.

**Telegram hosting stiker** — setelah user save ke Favorites, Telegram yang handle storage dan delivery. Kita tidak perlu simpan atau serve apapun.

---