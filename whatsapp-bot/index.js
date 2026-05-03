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

async function startBot() {
  // Fetch the latest WA Web version to avoid 405 errors
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`Using WA Web v${version.join('.')}, isLatest: ${isLatest}`);

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
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.log(`Connection closed (code: ${statusCode}). Reconnecting: ${shouldReconnect}`);

      if (statusCode === DisconnectReason.loggedOut) {
        // Clear corrupt auth state
        const authDir = path.join(__dirname, 'auth_info_baileys');
        if (fs.existsSync(authDir)) {
          fs.rmSync(authDir, { recursive: true, force: true });
          console.log('Auth state cleared. Please restart to scan QR again.');
        }
      } else if (shouldReconnect) {
        // Delay before reconnecting to avoid rapid-fire loops
        console.log('Reconnecting in 3 seconds...');
        setTimeout(() => startBot(), 3000);
      }
    } else if (connection === 'open') {
      console.log('✅ WhatsApp Bot is online! 🚀');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    if (!isRelevantMessage(msg)) return;

    const { command, args } = getCommandAndArgs(msg, PREFIX);
    if (!command) return;

    console.log(`[Command] ${command} from ${msg.key.remoteJid}`);

    try {
      switch (command) {
        case 's':
        case 'sticker':
          await stickerHandler(sock, msg);
          break;
        case 'ping':
          await pingHandler(sock, msg);
          break;
        case 'help':
          await helpHandler(sock, msg, PREFIX);
          break;
        default:
          // Ignore unknown commands
          break;
      }
    } catch (error) {
      console.error('Error executing command:', error);
      await sock.sendMessage(msg.key.remoteJid, { text: 'Waduh, ada error waktu proses command ini. 🥲' }, { quoted: msg });
    }
  });
}

startBot();
