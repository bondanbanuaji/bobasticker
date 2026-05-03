/**
 * BobaSticker 3.0 - All Rights Reserved
 * Copyright (c) 2026 BobaSticker
 */
require('dotenv').config();
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  Browsers
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { getCommandAndArgs, isRelevantMessage } = require('./lib/messageHelper');

// Import handlers
const stickerHandler = require('./lib/commands/sticker');
const pingHandler = require('./lib/commands/ping');
const helpHandler = require('./lib/commands/help');

const PREFIX = process.env.PREFIX || '.';

// ─────────────────────────────────────────────
// Logging Helpers
// ─────────────────────────────────────────────
const TAG = {
  CMD:   '📨 [CMD]  ',
  OK:    '✅ [OK]   ',
  WARN:  '⚠️  [WARN] ',
  ERR:   '❌ [ERR]  ',
  INFO:  '💬 [INFO] ',
  CONN:  '🔌 [CONN] ',
};

function timestamp() {
  return new Date().toLocaleTimeString('id-ID', { hour12: false });
}

function log(tag, message, extra = '') {
  const t = `\x1b[90m${timestamp()}\x1b[0m`;
  const extraStr = extra ? `\x1b[90m | ${extra}\x1b[0m` : '';
  console.log(`${t} ${tag}${message}${extraStr}`);
}

// Format JID menjadi lebih mudah dibaca (ambil nomor / nama grup)
function formatJid(jid = '') {
  if (!jid) return 'unknown';
  if (jid.includes('@g.us')) return `Grup(${jid.split('@')[0]})`;
  if (jid.includes('@lid')) return `LID(${jid.split('@')[0].slice(-8)})`;
  return jid.replace('@s.whatsapp.net', '');
}

// ─────────────────────────────────────────────

async function startBot() {
  log(TAG.INFO, 'Mengambil versi WA Web terbaru...');
  const { version, isLatest } = await fetchLatestBaileysVersion();
  log(TAG.INFO, `WA Web v${version.join('.')} — isLatest: ${isLatest ? 'ya ✅' : 'tidak ⚠️'}`);

  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const sock = makeWASocket({
    auth: state,
    version,
    browser: Browsers.windows('Desktop'),
    logger: pino({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\n📱 Scan QR Code ini dengan WhatsApp di HP kamu:\n');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const err = new Boom(lastDisconnect?.error);
      const statusCode = err?.output?.statusCode;
      const reason = err?.output?.payload?.message || 'Unknown';
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      log(TAG.CONN, `Koneksi terputus — code: ${statusCode}, alasan: "${reason}"`);

      if (statusCode === DisconnectReason.loggedOut) {
        log(TAG.WARN, 'Sesi logout. Menghapus auth state...');
        const authDir = path.join(__dirname, 'auth_info_baileys');
        if (fs.existsSync(authDir)) {
          fs.rmSync(authDir, { recursive: true, force: true });
          log(TAG.OK, 'Auth state terhapus. Restart bot untuk scan QR baru.');
        }
      } else if (shouldReconnect) {
        log(TAG.CONN, 'Reconnecting dalam 3 detik...');
        setTimeout(() => startBot(), 3000);
      }
    } else if (connection === 'open') {
      log(TAG.OK, 'WhatsApp Bot ONLINE! 🚀');
    } else if (connection === 'connecting') {
      log(TAG.CONN, 'Menghubungkan ke WhatsApp...');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;
    if (!isRelevantMessage(msg)) return;

    const { command, args } = getCommandAndArgs(msg, PREFIX);
    if (!command) return;

    const from = formatJid(msg.key.remoteJid);
    const msgType = msg.message.imageMessage
      ? 'image'
      : msg.message.extendedTextMessage
      ? 'text+quote'
      : 'text';

    log(TAG.CMD, `\x1b[1m.${command}\x1b[0m`, `dari: ${from} | tipe: ${msgType}`);

    try {
      switch (command) {
        case 's':
        case 'sticker':
          await stickerHandler(sock, msg);
          log(TAG.OK, `.sticker selesai diproses`, `untuk: ${from}`);
          break;
        case 'ping':
          await pingHandler(sock, msg);
          log(TAG.OK, `.ping dibalas`, `untuk: ${from}`);
          break;
        case 'help':
          await helpHandler(sock, msg, PREFIX);
          log(TAG.OK, `.help dikirim`, `untuk: ${from}`);
          break;
        default:
          log(TAG.WARN, `Command tidak dikenal: .${command}`, `dari: ${from}`);
          break;
      }
    } catch (error) {
      log(TAG.ERR, `Error di command .${command}: ${error.message}`, `dari: ${from}`);
      await sock.sendMessage(
        msg.key.remoteJid,
        { text: 'Waduh, ada error waktu proses command ini. 🥲' },
        { quoted: msg }
      );
    }
  });
}

startBot();
