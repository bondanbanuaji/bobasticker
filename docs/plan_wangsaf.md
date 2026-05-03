# WhatsApp Sticker Bot (Boba) — Perencanaan Teknis

> Nomor WA pribadi kedua dijadikan bot. Bisa DM dan masuk grup.
> Gratis selamanya. Tanpa Meta Business API. Tanpa bayar apapun.

---

## Daftar Isi

1. [Kenapa Beda dari Telegram](#kenapa-beda-dari-telegram)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Stack Teknologi](#stack-teknologi)
4. [Struktur Project](#struktur-project)
5. [Daftar Command Bot](#daftar-command-bot)
6. [Alur Kerja Bot](#alur-kerja-bot)
7. [Hosting Gratis](#hosting-gratis)
8. [Roadmap Pengerjaan](#roadmap-pengerjaan)
9. [Batasan & Risiko](#batasan--risiko)

---

## Kenapa Beda dari Telegram

WhatsApp **tidak punya Bot API resmi** seperti Telegram. Tidak ada @BotFather, tidak ada webhook native.

Solusinya: pakai library **Baileys** — library open-source Node.js yang meng-emulate WhatsApp Web. Bot berjalan sebagai "user biasa" menggunakan nomor WA kamu, bukan akun bisnis berbayar.

Konsekuensinya:
- Butuh **koneksi persistent** (WebSocket), bukan serverless
- Tidak bisa pakai Vercel untuk ini — butuh server yang selalu nyala
- Login sekali via QR code atau pairing code, sesi disimpan lokal

---

## Arsitektur Sistem

```
Seseorang kirim pesan/gambar ke nomor bot
        │
        ▼
WhatsApp Server
        │  WebSocket persistent connection
        ▼
Bot Node.js (Baileys)                ← jalan terus, 24/7
        │
        ├─ Bukan command?  → ignore / balas sapaan
        ├─ Command .help   → kirim daftar command
        ├─ Command .ping   → balas "pong 🏓"
        │
        └─ Command .s (ada gambar):
                │
                ├─ Download gambar dari WA
                ├─ Sharp: resize 512×512 → encode .webp
                └─ Kirim balik sebagai sticker WA
```

> Semua proses in-memory. Tidak ada database. File gambar dibuang setelah dikirim.

---

## Stack Teknologi

| Layer | Pilihan | Alasan |
|---|---|---|
| **WA Library** | `@whiskeysockets/baileys` | Satu-satunya library WA open-source yang aktif di-maintain, gratis, support multidevice |
| **Image processing** | `sharp` | Sama seperti bot Telegram — sudah familiar, cepat, native .webp |
| **Runtime** | Node.js 18+ | Kompatibel dengan Baileys dan Sharp |
| **Session storage** | File lokal (`auth_info_baileys/`) | Simpan sesi WA supaya tidak perlu scan QR ulang setiap restart |
| **Process manager** | PM2 | Pastikan bot auto-restart kalau crash, jalan terus di background |
| **Hosting** | Railway Free Tier | Support persistent process, bukan serverless, gratis |

---

## Struktur Project

```
whatsapp-bot/
│
├── index.js                      ← Entry point, koneksi WA + router command
│
├── lib/
│   ├── commands/
│   │   ├── sticker.js            ← Handler command .s / .sticker
│   │   ├── ping.js               ← Handler command .ping
│   │   └── help.js               ← Handler command .help
│   │
│   ├── imageProcessor.js         ← Sharp: resize + encode .webp (reuse dari bot Telegram)
│   └── messageHelper.js          ← Helper: reply, react, isGroup, isFromMe, dsb
│
├── auth_info_baileys/            ← Sesi WA tersimpan di sini (jangan di-commit ke git!)
│
├── .env
│   └── PREFIX=.                  ← Prefix command, bisa diganti
│
├── .gitignore                    ← Wajib ignore: auth_info_baileys/, node_modules/
├── package.json
└── ecosystem.config.js           ← Konfigurasi PM2
```

---

## Daftar Command Bot

Semua command pakai prefix titik (`.`) supaya tidak konflik dengan obrolan biasa.

### Sticker

| Command | Cara Pakai | Keterangan |
|---|---|---|
| `.s` | Kirim gambar + caption `.s` | Convert gambar jadi sticker |
| `.s` | Quote/reply gambar dengan `.s` | Convert gambar yang di-quote jadi sticker |
| `.sticker` | Alias dari `.s` | Sama persis, nama panjang |

### Utilitas

| Command | Cara Pakai | Keterangan |
|---|---|---|
| `.ping` | Ketik `.ping` | Bot balas waktu respons dalam ms |
| `.help` | Ketik `.help` | Bot kirim daftar semua command |
| `.info` | Ketik `.info` | Info versi bot + uptime |

### Contoh Penggunaan di Grup

```
User kirim gambar dengan caption: .s
Bot balas: [sticker dari gambar tersebut]

User reply gambar lama dengan: .s
Bot balas: [sticker dari gambar yang di-reply]

User ketik: .ping
Bot balas: 🏓 Pong! 42ms
```

---

## Alur Kerja Bot

### Startup & Koneksi

```js
// index.js — alur utama
1. Baileys buat koneksi ke WA server via WebSocket
2. Cek apakah sesi (auth_info_baileys/) sudah ada:
   - Ada  → pakai sesi lama, langsung online tanpa scan QR
   - Baru → tampilkan QR di terminal → scan dengan HP nomor bot
3. Bot online, mulai listen event 'messages.upsert'
```

### Routing Pesan Masuk

```js
// Setiap pesan masuk dicek:
1. Abaikan pesan dari diri sendiri (isFromMe)
2. Abaikan pesan tanpa teks / tanpa gambar yang relevan
3. Cek apakah teks dimulai dengan PREFIX (default: ".")
4. Extract nama command → route ke handler yang sesuai
5. Kalau tidak ada command yang cocok → ignore (tidak reply)
```

### Handler Command `.s`

```js
// lib/commands/sticker.js
1. Cek apakah ada gambar:
   - Di pesan langsung (imageMessage)
   - Di pesan yang di-quote/reply (quotedMessage)
2. Kalau tidak ada gambar → balas "Kirim atau quote gambar dulu ya!"
3. Download gambar → Buffer
4. Sharp: resize 512×512 fit contain + background transparan → .webp Buffer
5. Baileys sendMessage dengan type 'sticker'
6. Done
```

---

## Hosting Gratis

### Opsi 1 — Railway (Direkomendasikan)

Railway punya free tier dengan $5 kredit/bulan, cukup untuk bot ringan.

```
1. Buat akun di railway.app
2. New Project → Deploy from GitHub repo
3. Set environment variable: PREFIX=.
4. Railway otomatis detect Node.js dan jalankan npm start
5. Bot online 24/7
```

**Catatan:** Sesi WA (`auth_info_baileys/`) perlu di-handle khusus karena Railway bisa restart container. Solusi: mount persistent volume di Railway (tersedia di free tier).

---

### Opsi 2 — Jalankan Lokal dengan PM2

Paling simpel, paling stabil. Cocok kalau ada PC/laptop yang nyala terus atau Raspberry Pi.

```bash
# Install PM2 global
npm install -g pm2

# Jalankan bot
pm2 start index.js --name boba-wa-bot

# Auto-start saat PC reboot
pm2 startup
pm2 save

# Cek status
pm2 status

# Lihat log
pm2 logs boba-wa-bot
```

---

### Opsi 3 — Oracle Cloud Free Tier (Paling Stabil, Gratis Selamanya)

Oracle Cloud punya VM gratis permanen (bukan trial): 1 vCPU, 1 GB RAM, cukup banget untuk bot.

```
1. Daftar di cloud.oracle.com (butuh kartu kredit untuk verifikasi, tapi tidak dicharge)
2. Buat VM instance dengan image Ubuntu → pilih "Always Free"
3. SSH ke VM
4. Install Node.js + PM2
5. Clone repo bot, npm install
6. pm2 start → bot online 24/7 gratis selamanya
```

---

## Roadmap Pengerjaan

```
01. [ ] Setup  — Siapkan nomor WA kedua (aktif, bisa scan QR)
02. [ ] Setup  — Init project: mkdir whatsapp-bot && npm init -y
03. [ ] Setup  — Install dependencies: npm i @whiskeysockets/baileys sharp qrcode-terminal
04. [ ] Code   — Buat index.js: koneksi Baileys + event listener
05. [ ] Code   — Buat lib/imageProcessor.js (bisa copy dari bot Telegram)
06. [ ] Code   — Buat lib/commands/sticker.js
07. [ ] Code   — Buat lib/commands/ping.js + help.js
08. [ ] Code   — Buat lib/messageHelper.js (router + helper functions)
09. [ ] Test   — Jalankan lokal: node index.js → scan QR → test command
10. [ ] Setup  — Tambah .gitignore (auth_info_baileys/ + node_modules/)
11. [ ] Deploy — Push ke GitHub → deploy ke Railway / setup PM2 lokal
12. [ ] Test   — Test di DM pribadi
13. [ ] Test   — Masukkan bot ke grup → test command .s di grup
```

---

## Batasan & Risiko

| Hal | Detail | Mitigasi |
|---|---|---|
| **Risiko banned WA** | WhatsApp bisa ban nomor yang terdeteksi menggunakan library unofficial | Pakai nomor kedua (bukan nomor utama), jangan spam, jangan kirim ke banyak orang sekaligus |
| **Sesi expired** | Sesi bisa hangus kalau nomor logout dari WA Web atau terlalu lama tidak aktif | Simpan `auth_info_baileys/` dengan baik, siap scan QR ulang kalau perlu |
| **Tidak ada webhook** | Berbeda dari Telegram, bot harus selalu online (persistent connection) | Gunakan PM2 atau Railway untuk pastikan proses tidak mati |
| **Restart = offline** | Kalau proses mati, bot tidak bisa terima pesan sampai dijalankan lagi | PM2 dengan `--watch` atau Railway auto-restart handle ini |
| **Bukan API resmi** | Baileys bisa rusak kalau WhatsApp update protokol internal mereka | Pantau GitHub Baileys untuk update, update library secara berkala |

---

## Perbedaan Bot Telegram vs WhatsApp (Ringkasan)

| Aspek | Telegram Bot | WhatsApp Bot (Baileys) |
|---|---|---|
| **API** | Resmi (Bot API) | Unofficial (emulate WA Web) |
| **Hosting** | Vercel serverless | Server persistent (Railway/lokal) |
| **Login** | BOT_TOKEN dari BotFather | Scan QR dengan nomor WA |
| **Risiko banned** | Tidak ada | Ada (pakai nomor kedua) |
| **Sticker format** | .webp 512×512 | .webp 512×512 (sama persis) |
| **Grup support** | Ya | Ya |
| **DM support** | Ya | Ya |
| **Gratis** | Ya | Ya |

---
