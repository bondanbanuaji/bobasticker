const sharp = require('sharp');

async function processImageToSticker(imageBuffer) {
  // Same logic as Telegram bot: 512x512 webp
  return await sharp(imageBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 80 })
    .toBuffer();
}

module.exports = { processImageToSticker };
