# 📋 Setup Manual — StikerKu Bot

> Panduan lengkap dari nol sampai bot aktif dan bisa dipakai.

---

## Prasyarat

- **Node.js** v18+ sudah terinstall
- **Akun GitHub** — untuk push repo
- **Akun Vercel** (gratis) — untuk deploy
- **Akun Telegram** — untuk membuat bot

---

## Langkah 1 — Buat Bot di Telegram

1. Buka Telegram, cari **@BotFather**
2. Ketik `/newbot`
3. Ikuti instruksi:
   - Masukkan **nama bot** (contoh: `StikerKu`)
   - Masukkan **username bot** (contoh: `StikerKuBot`) — harus diakhiri dengan `Bot`
4. BotFather akan memberikan **BOT_TOKEN** — simpan, jangan share ke siapapun

> ⚠️ Token ini adalah kunci akses penuh ke bot kamu. Jangan commit ke repository.

---

## Langkah 2 — Update Username Bot di Landing Page

Buka file `app/page.tsx`, ganti baris ini:

```tsx
const BOT_USERNAME = "StikerKuBot"; // Ganti dengan username bot kamu
```

Ganti `"StikerKuBot"` dengan username bot yang kamu buat di BotFather.

---

## Langkah 3 — Generate Webhook Secret

Buat random string sebagai secret token. Bisa pakai command ini:

**PowerShell:**
```powershell
[System.Guid]::NewGuid().ToString("N")
```

**Atau via Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Simpan hasilnya — ini akan jadi `WEBHOOK_SECRET`.

---

## Langkah 4 — Setup Environment Variables

### Lokal (untuk development)

Edit file `.env.local` di root project:

```env
BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
WEBHOOK_SECRET=random_string_yang_kamu_generate
```

### Di Vercel (untuk production)

1. Login ke [vercel.com](https://vercel.com)
2. Pilih project kamu
3. **Settings** → **Environment Variables**
4. Tambahkan:
   | Name | Value |
   |---|---|
   | `BOT_TOKEN` | Token dari BotFather |
   | `WEBHOOK_SECRET` | Random string yang kamu generate |
5. Klik **Save**

---

## Langkah 5 — Push ke GitHub & Deploy ke Vercel

### Push ke GitHub

```bash
git add .
git commit -m "feat: initial StikerKu bot"
git remote add origin https://github.com/USERNAME/stikerku-bot.git
git push -u origin main
```

### Deploy ke Vercel

1. Login ke [vercel.com](https://vercel.com)
2. Klik **Add New Project**
3. Import repository `stikerku-bot` dari GitHub
4. Vercel otomatis detect Next.js — klik **Deploy**
5. Tunggu sampai deploy selesai
6. Catat **URL production** kamu (contoh: `https://stikerku-bot.vercel.app`)

---

## Langkah 6 — Aktivasi Webhook

Setelah deploy berhasil, buka browser dan akses URL berikut (**ganti nilai yang di-bold**):

```
https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url=https://{VERCEL_URL}/api/webhook&secret_token={WEBHOOK_SECRET}
```

Contoh:
```
https://api.telegram.org/bot123456:ABC-DEF/setWebhook?url=https://stikerku-bot.vercel.app/api/webhook&secret_token=abc123secret
```

### Verifikasi Webhook Aktif

Buka URL ini di browser:

```
https://api.telegram.org/bot{BOT_TOKEN}/getWebhookInfo
```

Pastikan response menunjukkan:
- `"url"` → URL webhook kamu
- `"has_custom_certificate"` → `false`
- `"pending_update_count"` → `0` (atau angka kecil)

---

## Langkah 7 — Test Bot! 🎉

1. Buka Telegram
2. Cari bot kamu berdasarkan username
3. Tekan **Start**
4. Kirim foto apa saja
5. Dalam 1-2 detik, bot akan membalas dengan **stiker .webp**
6. **Tap & hold** stiker → **Add to Favorites** ⭐

---

## Troubleshooting

### Bot tidak merespon

1. Cek **Vercel Function Logs**:
   - Vercel Dashboard → Project → **Logs** tab
2. Pastikan `BOT_TOKEN` dan `WEBHOOK_SECRET` sudah benar di Vercel Environment Variables
3. Pastikan webhook sudah di-set dengan URL yang benar (hit `getWebhookInfo`)

### Error "Unauthorized" (401)

- `WEBHOOK_SECRET` di Vercel tidak sama dengan yang dipakai saat `setWebhook`
- Solusi: Ulangi `setWebhook` dengan secret yang sama persis

### Error saat proses gambar

- Pastikan `sharp` terinstall di `package.json` (sudah include secara default)
- Vercel otomatis install dependency saat deploy

### Cold start lambat

- Normal untuk Vercel Free Tier (~300ms)
- Telegram menunggu response hingga 60 detik, jadi tidak masalah

---

## Struktur File Project

```
stikerku-bot/
├── app/
│   ├── api/
│   │   └── webhook/
│   │       └── route.ts          ← Webhook handler (inti bot)
│   ├── globals.css               ← Design system + animasi
│   ├── layout.tsx                ← Root layout + SEO metadata
│   └── page.tsx                  ← Landing page
│
├── lib/
│   ├── telegram.ts               ← Helper: getFile, downloadFile, sendSticker, sendMessage
│   └── imageProcessor.ts         ← Sharp: resize 512×512 + encode .webp
│
├── .env.local                    ← Environment variables (JANGAN commit)
├── .env.example                  ← Template env (aman di-commit)
├── vercel.json                   ← Config: maxDuration 10s untuk webhook
└── package.json
```

---

## Tips

- **Mau ganti bot name?** Edit `BOT_USERNAME` di `app/page.tsx`
- **Mau custom favicon?** Ganti file `app/favicon.ico`
- **Mau deploy ulang?** Cukup `git push` — Vercel auto-deploy
- **Webhook hanya perlu di-set sekali**, kecuali domain Vercel berubah

---

*Selamat! Bot stiker kamu sudah live dan gratis selamanya.* 🚀
