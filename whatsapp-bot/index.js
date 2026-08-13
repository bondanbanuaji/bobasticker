/**
 * BobaSticker WhatsApp Bot (Baileys)
 *
 * Copyright (c) 2026 BobaSticker - All Rights Reserved
 *
 * Flow:
 * 1. Login via QR / pairing code (session disimpan di auth_info_baileys)
 * 2. Terima pesan (text/image) via messages.upsert
 * 3. Perintah: .s / .sticker / .ping / .help
 * 4. Gambar di-download → dikonversi 512x512 .webp via Sharp → dikirim sebagai stiker
 */

const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  downloadMediaMessage,
  getContentType,
} = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const sharp = require("sharp");
const pino = require("pino");
require("dotenv").config();

const PREFIX = process.env.PREFIX || ".";
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
const PAIRING_PHONE = process.env.PAIRING_PHONE || "";
const AUTH_FOLDER = process.env.AUTH_FOLDER || "auth_info_baileys";
const logger = pino({ level: process.env.LOG_LEVEL || "silent" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Convert input image buffer to a 512x512 .webp sticker buffer.
 * Same logic as lib/imageProcessor.ts (Telegram bot).
 */
async function toStickerWebp(inputBuffer) {
  return sharp(inputBuffer)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 80 })
    .toBuffer();
}

const HELP_TEXT = `╔══════════════════════╗
     🧋 BOBA STICKER BOT
╚══════════════════════╝

Ubah foto jadi stiker WA dalam hitungan detik!
Gratis, cepat, dan tanpa simpan data.

━━━━━━━━━━━━━━━━━━━━━━
  📌 DAFTAR COMMAND
━━━━━━━━━━━━━━━━━━━━━━

🖼️ STIKER
┃
┣ .s — Bikin stiker dari gambar
┃   • Kirim gambar + caption .s
┃   • atau reply gambar lalu ketik .s
┃
┗ .sticker — Alias dari .s

🛠️ UTILITAS
┃
┣ .ping — Cek kecepatan respons bot
┃
┗ .help — Tampilkan menu ini

━━━━━━━━━━━━━━━━━━━━━━
  📖 CARA PAKAI
━━━━━━━━━━━━━━━━━━━━━━

① Kirim gambar baru
   Pilih foto → caption .s → kirim

② Reply gambar orang
   Tap & hold gambar → Reply → .s

━━━━━━━━━━━━━━━━━━━━━━

💡 Tips: Bisa dipakai di DM maupun Grup!
🔒 Foto tidak disimpan — diproses di memory, langsung dibuang.
⚡ Powered by Sharp · Format WebP 512x512

╔══════════════════════╗
   © 2026 BobaSticker
╚══════════════════════╝`;

/**
 * Extract plain text from any incoming message.
 */
function extractText(msg) {
  const content = msg.message;
  const type = getContentType(content);
  if (type === "conversation") return content.conversation || "";
  if (type === "extendedTextMessage") return content.extendedTextMessage?.text || "";
  if (type === "imageMessage") return content.imageMessage?.caption || "";
  if (type === "videoMessage") return content.videoMessage?.caption || "";
  return "";
}

/**
 * Download image buffer from a message (or a quoted image).
 */
async function downloadImage(sock, msg) {
  const content = msg.message;

  if (getContentType(content) === "imageMessage") {
    return downloadMediaMessage(msg, "buffer", {}, {
      logger,
      reuploadRequest: sock.updateMediaMessage,
    });
  }

  // Quoted image (reply gambar lalu ketik .s)
  const context = content.extendedTextMessage?.contextInfo;
  const quoted = context?.quotedMessage;
  if (quoted?.imageMessage) {
    const quotedMsg = {
      key: {
        remoteJid: msg.key.remoteJid,
        id: context.stanzaId,
        fromMe: false,
        participant: context.participant,
      },
      message: quoted,
    };
    return downloadMediaMessage(quotedMsg, "buffer", {}, {
      logger,
      reuploadRequest: sock.updateMediaMessage,
    });
  }

  return null;
}

async function handleMessage(sock, msg) {
  if (!msg.message) return;
  if (msg.key.fromMe) return;

  const remoteJid = msg.key.remoteJid;
  if (!remoteJid || remoteJid === "status@broadcast") return;

  const text = extractText(msg).toLowerCase().trim();

  // Maintenance mode
  if (MAINTENANCE_MODE) {
    await sock.sendMessage(remoteJid, {
      text: "maaf, kita lagi maintenance sebentar. coba lagi nanti ya ^_^",
      quoted: msg,
    });
    return;
  }

  if (text === ".ping") {
    const t0 = Date.now();
    await sock.sendMessage(remoteJid, {
      text: "🧋 Pong! Bot aktif dan siap melayani. ⚡",
      quoted: msg,
    });
    console.log(`[ping] ${remoteJid} — ${Date.now() - t0}ms`);
    return;
  }

  if (text === ".help") {
    await sock.sendMessage(remoteJid, { text: HELP_TEXT, quoted: msg });
    return;
  }

  const isStickerCmd = text.startsWith(".s") || text.startsWith(".sticker");
  if (!isStickerCmd) return;

  // Mark as read
  try {
    await sock.readMessages([msg.key]);
  } catch {}

  try {
    const imageBuffer = await downloadImage(sock, msg);
    if (!imageBuffer) {
      await sock.sendMessage(remoteJid, {
        text: "kirim atau quote gambar dulu ya! 📸",
        quoted: msg,
      });
      return;
    }

    // React ⏳
    await sock.sendMessage(remoteJid, { react: { text: "⏳", key: msg.key } });

    // Initial text
    await sock.sendMessage(remoteJid, {
      text: "wait, lagi aing proses dulu ya...",
      quoted: msg,
    });

    // Download done + intermediate text
    await sock.sendMessage(remoteJid, {
      text: "sabar ya brow, bentar lagi jadi nih",
      quoted: msg,
    });

    // Convert to sticker
    const webpBuffer = await toStickerWebp(imageBuffer);

    // Send sticker (quoted to original message)
    const sent = await sock.sendMessage(remoteJid, {
      sticker: webpBuffer,
    }, { quoted: msg });

    // React ✅ to the sticker
    if (sent?.key) {
      await sock.sendMessage(remoteJid, {
        react: { text: "✅", key: sent.key },
      });
    }

    // Final message
    await sleep(500);
    await sock.sendMessage(remoteJid, {
      text: "stikernya udah jadi! tap & hold buat save ke favorit ⭐",
      quoted: msg,
    });
  } catch (error) {
    console.error("[sticker] error:", error);
    await sock.sendMessage(remoteJid, {
      text: "aduh, gagal bikin stiker 😢 coba lagi ya atau pake gambar lain.",
      quoted: msg,
    });
  }
}

async function startBot() {
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

  const sock = makeWASocket({
    version,
    logger,
    auth: state,
    browser: ["BobaSticker", "Chrome", "1.0.0"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("==============================================");
      console.log("Scan QR ini: WhatsApp > Linked Devices > Link a Device");
      console.log("==============================================");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ BobaSticker WA bot ONLINE! 🧋");
    } else if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const loggedOut = statusCode === 401;
      if (loggedOut) {
        console.log("❌ Session di-logout. Hapus folder auth_info_baileys lalu jalankan ulang untuk scan QR baru.");
        process.exit(1);
      }
      console.log(`❌ Koneksi tertutup (${statusCode}). Reconnect dalam 3 detik...`);
      setTimeout(startBot, 3000);
    }
  });

  // Pairing code alternative for headless servers (QR sulit di-render di terminal cPanel)
  if (PAIRING_PHONE && !state.creds.registered) {
    try {
      const code = await sock.requestPairingCode(PAIRING_PHONE);
      console.log("==============================================");
      console.log("Pairing code untuk", PAIRING_PHONE, ":");
      console.log(`${code.slice(0, 4)}-${code.slice(4)}`);
      console.log("WhatsApp > Linked Devices > Link with phone number");
      console.log("==============================================");
    } catch (error) {
      console.error("Gagal minta pairing code:", error.message);
    }
  }

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) {
      try {
        await handleMessage(sock, msg);
      } catch (error) {
        console.error("[handleMessage] error:", error);
      }
    }
  });
}

startBot().catch((error) => {
  console.error("Fatal:", error);
  process.exit(1);
});
