const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { processImageToSticker } = require('../imageProcessor');

/**
 * Helper: jeda (delay) dalam milidetik
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function stickerHandler(sock, msg) {
  const jid = msg.key.remoteJid;
  const messageContent = msg.message;
  let isImage = false;
  let targetMessage = msg;

  // Cek apakah direct image message
  if (messageContent.imageMessage) {
    isImage = true;
  }
  // Cek apakah quoted image message
  else if (
    messageContent.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
  ) {
    isImage = true;
    targetMessage = {
      message: messageContent.extendedTextMessage.contextInfo.quotedMessage
    };
  }

  // Kalau tidak ada gambar sama sekali
  if (!isImage) {
    await sock.sendMessage(
      jid,
      { text: 'kirim atau quote gambar dulu ya! 📸' },
      { quoted: msg }
    );
    return;
  }

  try {
    // 1. React ⏳ ke pesan user
    await sock.sendMessage(jid, { react: { text: '⏳', key: msg.key } });

    // 2. Pesan teks pertama (langsung, tanpa jeda)
    await sock.sendMessage(jid, { text: 'wait, lagi aing proses dulu ya... ' }, { quoted: msg });

    // 3. Mulai konversi gambar (download + sharp)
    const [buffer] = await Promise.all([
      downloadMediaMessage(
        targetMessage,
        'buffer',
        {},
        {
          logger: { info: () => {}, error: () => {}, debug: () => {}, warn: () => {} },
          reuploadRequest: sock.updateMediaMessage
        }
      ),
      // 4. Kirim pesan sambil menunggu (langsung setelah proses mulai)
      sock.sendMessage(jid, { text: 'sabar ya brow, bentar lagi jadi nih ' }, { quoted: msg }),
    ]);

    // 3b. Proses ke stiker WebP 512x512
    const stickerBuffer = await processImageToSticker(buffer);

    // 5. Kirim stikernya
    const sentSticker = await sock.sendMessage(
      jid,
      { sticker: stickerBuffer },
      { quoted: msg }
    );

    // 6. React ✅ ke pesan stiker (bukan ke pesan user)
    if (sentSticker?.key) {
      await sock.sendMessage(jid, { react: { text: '✅', key: sentSticker.key } });
    }

    // 7. Jeda 500ms lalu kirim pesan penutup
    await sleep(500);
    await sock.sendMessage(
      jid,
      { text: 'stikernya udah jadi! tap & hold buat save ke favorit ⭐' },
      { quoted: msg }
    );

  } catch (error) {
    console.error('[stickerHandler] Error:', error);
    await sock.sendMessage(
      jid,
      { text: 'Waduh, gagal bikin stikernya nih. Coba kirimin gambar yang lain ya! 🥲' },
      { quoted: msg }
    );
  }
}

module.exports = stickerHandler;
