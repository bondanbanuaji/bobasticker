const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { processImageToSticker } = require('../imageProcessor');

async function stickerHandler(sock, msg) {
  const messageContent = msg.message;
  let isImage = false;
  let targetMessage = msg;

  // Check if direct image message
  if (messageContent.imageMessage) {
    isImage = true;
  } 
  // Check if quoted image message
  else if (
    messageContent.extendedTextMessage &&
    messageContent.extendedTextMessage.contextInfo &&
    messageContent.extendedTextMessage.contextInfo.quotedMessage &&
    messageContent.extendedTextMessage.contextInfo.quotedMessage.imageMessage
  ) {
    isImage = true;
    // We need to construct a fake message object that downloadMediaMessage can understand
    targetMessage = {
      message: messageContent.extendedTextMessage.contextInfo.quotedMessage
    };
  }

  if (!isImage) {
    await sock.sendMessage(
      msg.key.remoteJid,
      { text: 'Kirim gambar dengan caption .s atau reply gambar dengan .s ya!' },
      { quoted: msg }
    );
    return;
  }

  try {
    // React to let user know we are processing
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '⏳', key: msg.key } });

    // Download the image
    const buffer = await downloadMediaMessage(
      targetMessage,
      'buffer',
      {},
      {
        logger: console,
        reuploadRequest: sock.updateMediaMessage
      }
    );

    // Process into webp sticker
    const stickerBuffer = await processImageToSticker(buffer);

    // Send sticker
    await sock.sendMessage(
      msg.key.remoteJid,
      { sticker: stickerBuffer },
      { quoted: msg }
    );

    // React with success
    await sock.sendMessage(msg.key.remoteJid, { react: { text: '✅', key: msg.key } });

  } catch (error) {
    console.error('Error in stickerHandler:', error);
    await sock.sendMessage(
      msg.key.remoteJid,
      { text: 'Gagal bikin stiker nih. Coba lagi ya!' },
      { quoted: msg }
    );
  }
}

module.exports = stickerHandler;
