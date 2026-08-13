# 🧋 BobaSticker — WhatsApp Bot (Baileys)

Bot stiker WhatsApp: ubah foto jadi stiker dalam hitungan detik. Terpisah dari bot Telegram (`app/api/webhook`), berdiri sendiri di folder ini.

## Cara Menjalankan (Lokal)

```bash
cd whatsapp-bot
npm install
cp .env.example .env   # ubah nilainya kalau perlu
node index.js
```

Scan QR dengan **WhatsApp > Perangkat Tertaut > Tautkan Perangkat**.

> Server tanpa layar (SSH/headless)? Isi `PAIRING_PHONE` di `.env` (contoh `6281234567890`) — bot akan print **pairing code** yang dimasukkan lewat **WhatsApp > Perangkat Tertaut > Tautkan dengan nomor telepon**.

## Konfigurasi (`.env`)

| Key | Deskripsi | Default |
| :--- | :--- | :--- |
| `PREFIX` | Awalan perintah | `.` |
| `MAINTENANCE_MODE` | `true` = bot cuma balas "lagi maintenance" | `false` |
| `LOG_LEVEL` | `silent` / `warn` / `debug` | `silent` |
| `PAIRING_PHONE` | Nomor WA (internasional, tanpa `+`) untuk pairing code | kosong |
| `AUTH_FOLDER` | Folder session login | `auth_info_baileys` |

## Command

| Command | Fungsi |
| :--- | :--- |
| `.s` / `.sticker` | Kirim gambar dengan caption ini, atau reply gambar lalu ketik `.s` |
| `.ping` | Cek status bot |
| `.help` | Menu bantuan |

## Menjaga Tetap Hidup 24 Jam

Pakai **PM2** (rekomendasi, di VPS) atau `nohup`:

```bash
npm install -g pm2
pm2 start index.js --name wa-sticker-bot
pm2 save
pm2 startup
```

> ⚠️ Shared hosting (Developer Hosting AnymHost dll.) sering mematikan proses non-HTTP. Untuk benar-benar 24 jam, gunakan VPS. Lihat `docs/DEPLOY-WA-ANYMHOST.md`.
