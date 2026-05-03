cd# Panduan Setup Manual Bot WhatsApp (BobaSticker)

Karena WhatsApp tidak memiliki Bot API resmi seperti Telegram, kita menggunakan library **Baileys** untuk menjalankan bot. Ini berarti bot bertindak layaknya "WhatsApp Web" yang sedang login dengan nomor Anda.

Oleh karena itu, bot ini **TIDAK BISA** dijalankan di serverless platform seperti Vercel. Bot membutuhkan server yang berjalan terus menerus (persistent 24/7).

Berikut panduan lengkap untuk menjalankan bot di komputer Anda atau server cloud.

---

## Prasyarat

1. **Nomor WhatsApp**: Sangat disarankan menggunakan nomor kedua/cadangan, jangan nomor utama untuk menghindari risiko ban dari pihak WhatsApp. (Pada project ini kita menggunakan `+62 831-9023-0065`).
2. **Node.js**: Versi 18 atau ke atas.
3. **PM2**: (Opsional) Untuk menjaga bot tetap hidup di background.

---

## 1. Setup Lokal (Test di Komputer Sendiri)

1. Buka terminal, masuk ke folder `whatsapp-bot`:
   ```bash
   cd whatsapp-bot
   ```
2. Install dependency:
   ```bash
   npm install
   ```
3. Jalankan bot:
   ```bash
   node index.js
   ```
4. Terminal akan menampilkan **QR Code**. 
5. Buka aplikasi WhatsApp di HP (nomor bot `+62 831-9023-0065`), pilih **Linked Devices (Perangkat Taut)** > **Tautkan Perangkat**, lalu scan QR code di terminal.
6. Tunggu beberapa saat sampai terminal memunculkan pesan `WhatsApp Bot is online! 🚀`.
7. Test bot Anda! Buka WhatsApp dari nomor lain (atau grup), kirim sebuah gambar dengan caption `.s`.

> **Catatan:** Sesi login akan disimpan secara otomatis di folder `auth_info_baileys/`. Anda tidak perlu scan QR lagi selama tidak logout dari HP.

---

## 1.1. Testing Bot (DM & Grup)

Setelah bot berhasil online (`✅ WhatsApp Bot is online! 🚀`), saatnya test! Ada 2 cara:

### A. Test via DM (Chat Pribadi)

1. Buka WhatsApp dari **nomor lain** (bukan nomor bot).
2. Chat ke nomor bot (`+62 831-9023-0065`).
3. Kirim pesan `.help` → bot akan membalas daftar command.
4. Kirim sebuah **foto/gambar** dengan caption `.s` → bot akan membalas dengan **stiker**!
5. Atau kirim `.ping` → bot akan membalas `🏓 Pong!` beserta waktu respons.

### B. Test di Grup WhatsApp

1. Buat grup baru atau gunakan grup yang sudah ada.
2. **Masukkan nomor bot** (`+62 831-9023-0065`) ke dalam grup tersebut.
3. Sekarang, dari nomor kamu (bukan nomor bot), coba command berikut di dalam grup:

**Cara bikin stiker dari gambar di grup:**

| Cara | Langkah |
|---|---|
| **Kirim gambar baru** | Pilih gambar dari galeri → di kolom caption ketik `.s` → kirim |
| **Reply gambar orang lain** | Tap & hold gambar yang sudah ada di grup → pilih **Reply** → ketik `.s` → kirim |

**Contoh alur di grup:**
```
Kamu:  [Kirim gambar kucing] + caption ".s"
Bot:   [Membalas dengan stiker kucing 512x512] ✅

Teman: [Kirim gambar meme]
Kamu:  [Reply gambar teman] + ".s"
Bot:   [Membalas dengan stiker meme] ✅

Kamu:  .ping
Bot:   🏓 Pong! Speed: 42ms

Kamu:  .help
Bot:   [Daftar semua command yang tersedia]
```

> **Tips:**
> - Semua command harus diawali dengan tanda titik (`.`), contoh: `.s`, `.ping`, `.help`
> - Bot hanya memproses gambar, bukan video atau GIF.
> - Bot **tidak menyimpan** gambar kamu — semua diproses di memory dan langsung dibuang.

---

## 2. Deploy ke Server (Hosting 24/7)

Agar bot jalan terus walaupun laptop Anda mati, Anda perlu menghosting bot ini. 

### Opsi A: Railway (Gratis $5/Bulan)

1. Login ke [Railway.app](https://railway.app/).
2. Buat project baru dari repository GitHub Anda.
3. Karena struktur repo kita berbentuk *monorepo* (ada Vercel frontend dan subfolder `whatsapp-bot`), Anda perlu memberitahu Railway folder mana yang dijalankan:
   - Di pengaturan Railway (Settings > Build), atur **Root Directory** ke `/whatsapp-bot`.
4. Tambahkan Environment Variable:
   - `PREFIX=.`
5. **Penting (Storage)**: Tambahkan **Volume** di Railway, lalu mount ke `/app/whatsapp-bot/auth_info_baileys`. Ini wajib supaya saat Railway restart server, sesi WA Anda tidak hilang dan tidak minta scan QR lagi.
6. Deploy dan lihat log (Logs) untuk scan QR code-nya saat pertama kali jalan.

### Opsi B: VPS / Oracle Cloud Free Tier / Lokal dengan PM2

Bila Anda memiliki VPS sendiri (seperti Ubuntu di Oracle Cloud):

1. Masuk ke VPS Anda via SSH.
2. Install Node.js dan PM2:
   ```bash
   sudo npm install -g pm2
   ```
3. Clone repo Anda dan masuk ke folder bot:
   ```bash
   cd bobasticker/whatsapp-bot
   npm install
   ```
4. Jalankan bot pertama kali untuk scan QR:
   ```bash
   node index.js
   ```
   *Scan QR nya.*
5. Setelah sukses login, matikan dengan `Ctrl+C`.
6. Jalankan dengan PM2 agar hidup di background selamanya:
   ```bash
   pm2 start index.js --name "boba-wa"
   pm2 startup
   pm2 save
   ```
7. Untuk melihat log: `pm2 logs boba-wa`

---

## Troubleshooting

- **Bot tidak merespons**: Pastikan HP bot terhubung ke internet. Jika pakai VPS, cek log dengan `pm2 logs`.
- **Diminta scan QR terus-menerus**: Berarti folder `auth_info_baileys/` Anda terhapus/hilang setelah server restart. Pastikan Anda mengaktifkan *Persistent Storage/Volume* jika memakai docker/cloud platform.
- **Kena Banned WA**: Risiko ini selalu ada untuk bot WA unofficial. Untuk mengurangi risiko, jangan spam, jangan kirim pesan massal/broadcast. Hanya buat sistem balas-membalas.
