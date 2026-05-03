/**
 * Image processing with Sharp.
 * Converts any image buffer to a 512×512 .webp sticker-ready buffer.
 */

import sharp from "sharp";

/**
 * Convert input image buffer to a Telegram-compatible sticker.
 * - Resizes to 512×512 with `fit: contain`
 * - Transparent padding to preserve aspect ratio
 * - Outputs .webp format
 */
export async function toStickerWebp(inputBuffer: Buffer): Promise<Buffer> {
  return sharp(inputBuffer)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 80 })
    .toBuffer();
}
