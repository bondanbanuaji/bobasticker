# 🧋 BobaSticker 3.0

> **Premium Auto-Sticker Bot Engine.**
> Ubah foto jadi stiker WhatsApp & Telegram dalam hitungan detik dengan performa superior dan privasi mutlak.

---

## 🌟 Keunggulan Utama

- **⚡ Performa Tanpa Antrean**: Menggunakan *C++ Sharp Engine* untuk rendering stiker di dalam memori. Waktu respons rata-rata < 1 detik.
- **🔒 Privasi Mutlak**: Arsitektur *stateless*. Gambar Anda diproses secara *in-memory* dan langsung dihapus secara permanen dalam hitungan detik.
- **📱 Multi-Platform**: Satu core engine untuk menggerakkan bot di WhatsApp dan Telegram sekaligus.
- ** Desain Premium**: Landing page interaktif dengan integrasi Three.js (3D Boba Cup) dan Smooth Scrolling (Lenis).

---

## 🛠️ Tech Stack

### Frontend (Landing Page)
- **Framework**: Next.js 15 (App Router)
- **3D Engine**: Three.js + React Three Fiber
- **Styling**: Tailwind CSS 4 + Lucide Icons
- **Animation**: Lenis (Smooth Scroll)

### Bot Core
- **WhatsApp**: Baileys (@whiskeysockets/baileys)
- **Telegram**: Telegram Bot API (Webhook mode)
- **Image Processing**: Sharp (High-performance Node.js image processing)

---

## 🚀 Cara Menjalankan

### 1. Persiapan Environment
Buat file `.env.local` di root folder dan `.env` di dalam folder `whatsapp-bot`.

**Contoh `.env.local` (Frontend & Telegram):**
```env
BOT_TOKEN=your_telegram_bot_token
WEBHOOK_SECRET=your_secret_token
```

**Contoh `whatsapp-bot/.env`:**
```env
PREFIX=.
```

### 2. Jalankan Frontend
```bash
npm install
npm run dev
```

### 3. Jalankan WhatsApp Bot
```bash
cd whatsapp-bot
npm install
node index.js
```
Scan QR code yang muncul di terminal menggunakan aplikasi WhatsApp Anda.

---

## 📌 Daftar Command (Bot)

| Command | Deskripsi |
| :--- | :--- |
| `.s` / `.sticker` | Kirim gambar dengan caption ini untuk membuat stiker |
| `.ping` | Cek status dan kecepatan respons bot |
| `.help` | Menampilkan menu bantuan lengkap |

---

## ⚖️ Lisensi

**BobaSticker 3.0 - All Rights Reserved.**
Seluruh hak cipta dilindungi undang-undang. Penggunaan, penyalinan, atau pendistribusian ulang kode ini tanpa izin tertulis dari pemilik hak cipta dapat dikenakan sanksi hukum sesuai UU Hak Cipta yang berlaku.

Lihat file [LICENSE](./LICENSE) untuk detail hukum selengkapnya.

---

Crafted with precision by **BobaSticker Team**.
