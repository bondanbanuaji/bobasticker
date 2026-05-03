require('dotenv').config();
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const { getCommandAndArgs, isRelevantMessage } = require('./lib/messageHelper');

// Import handlers
const stickerHandler = require('./lib/commands/sticker');
const pingHandler = require('./lib/commands/ping');
const helpHandler = require('./lib/commands/help');

const PREFIX = process.env.PREFIX || '.';

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }), // Disable Baileys spam logs
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect =
        new Boom(lastDisconnect.error)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log(
        'Connection closed due to ',
        lastDisconnect.error,
        ', reconnecting ',
        shouldReconnect
      );
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === 'open') {
      console.log('WhatsApp Bot is online! 🚀');
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
