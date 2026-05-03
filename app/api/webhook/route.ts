/**
 * BobaSticker 3.0 - All Rights Reserved
 * Copyright (c) 2026 BobaSticker
 */
/**
 * Telegram Webhook Route Handler.
 *
 * Flow:
 * 1. Validate secret token header
 * 2. Parse Telegram update
 * 3. React ⏳
 * 4. Send "proses dulu" text
 * 5. Download photo and send "sabar ya bestie" text
 * 6. Convert to 512×512 .webp via Sharp
 * 7. Send sticker
 * 8. React ✅ to the sticker
 * 9. Send "udah jadi" text
 */

import { NextRequest } from "next/server";
import { getFile, downloadFile, sendSticker, sendMessage, setMessageReaction } from "@/lib/telegram";
import { toStickerWebp } from "@/lib/imageProcessor";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  // Step 1 — Validate webhook secret
  const secretHeader = request.headers.get("x-telegram-bot-api-secret-token");
  if (secretHeader !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Step 2 — Parse Telegram update
    const body = await request.json();
    const message = body.message;

    if (!message) {
      return new Response("OK", { status: 200 });
    }

    const chatId = message.chat.id;
    const messageId = message.message_id;

    // Maintenance Mode Check
    if (process.env.MAINTENANCE_MODE === 'true') {
        await sendMessage(chatId, "maaf, kita lagi maintenance sebentar. coba lagi nanti ya ^_^");
        return new Response("OK", { status: 200 });
    }

    // Handle Commands
    const text = message.text || message.caption || "";
    const lowerText = text.toLowerCase().trim();

    if (lowerText === "/start" || lowerText === ".help") {
      const helpText = `<b>╔══════════════════════╗</b>\n` +
        `     <b>🧋 BOBA STICKER BOT</b>\n` +
        `<b>╚══════════════════════╝</b>\n\n` +
        `<i>Ubah foto jadi stiker WA dalam hitungan detik!</i>\n` +
        `<i>Gratis, cepat, dan tanpa simpan data.</i>\n\n` +
        `<b>━━━━━━━━━━━━━━━━━━━━━━</b>\n` +
        `<b>  📌 DAFTAR COMMAND</b>\n` +
        `<b>━━━━━━━━━━━━━━━━━━━━━━</b>\n\n` +
        `🖼️ <b>STIKER</b>\n` +
        `┃\n` +
        `┣ <code>.s</code> — Bikin stiker dari gambar\n` +
        `┃   <i>Kirim gambar + caption</i> <code>.s</code>\n` +
        `┃   <i>atau reply gambar lalu ketik</i> <code>.s</code>\n` +
        `┃\n` +
        `┗ <code>.sticker</code> — <i>Alias dari</i> <code>.s</code>\n\n` +
        `<b>🛠️ UTILITAS</b>\n` +
        `┃\n` +
        `┣ <code>.ping</code> — Cek kecepatan respons bot\n` +
        `┃\n` +
        `┗ <code>.help</code> — Tampilkan menu ini\n\n` +
        `<b>━━━━━━━━━━━━━━━━━━━━━━</b>\n` +
        `<b>  📖 CARA PAKAI</b>\n` +
        `<b>━━━━━━━━━━━━━━━━━━━━━━</b>\n\n` +
        `<b>① Kirim gambar baru</b>\n` +
        `    Pilih foto → caption <code>.s</code> → kirim\n\n` +
        `<b>② Reply gambar orang</b>\n` +
        `    Tap & hold gambar → Reply → <code>.s</code>\n\n` +
        `<b>━━━━━━━━━━━━━━━━━━━━━━</b>\n\n` +
        `<blockquote>💡 <b>Tips:</b> Bisa dipakai di DM maupun Grup!\n` +
        `🔒 Foto tidak disimpan — diproses di memory, langsung dibuang.\n` +
        `⚡ Powered by <i>Sharp</i> · Format <i>WebP 512×512</i></blockquote>\n\n` +
        `<b>╔══════════════════════╗</b>\n` +
        `<b>   <i>© 2026 BobaSticker</i></b>\n` +
        `<b>╚══════════════════════╝</b>`;

      await sendMessage(chatId, helpText);
      return new Response("OK", { status: 200 });
    }

    if (lowerText === ".ping") {
        await sendMessage(chatId, "<b>🧋 Pong!</b> Bot aktif dan siap melayani. ⚡");
        return new Response("OK", { status: 200 });
    }

    const isStickerCmd = lowerText.startsWith(".s") || lowerText.startsWith(".sticker");

    // Process photo if it's a sticker command or if it's a direct photo with .s caption
    const photo = message.photo || (message.reply_to_message?.photo);
    
    if (isStickerCmd) {
        if (!photo) {
            await sendMessage(chatId, "kirim atau quote gambar dulu ya! 📸");
            return new Response("OK", { status: 200 });
        }

        // Step 3 — React to user message with ⏳
        await setMessageReaction(chatId, messageId, "⏳");

        // Step 4 — Send initial text
        await sendMessage(chatId, "wait, lagi aing proses dulu ya... ");

        // Step 5 — Download and Send intermediate text
        // photo array is sorted small → large, take the largest
        const fileId = photo.at(-1).file_id;
        const filePath = await getFile(fileId);
        
        // We do download and send message in parallel like WA bot
        const [buffer] = await Promise.all([
            downloadFile(filePath),
            sendMessage(chatId, "sabar ya brow, bentar lagi jadi nih ")
        ]);

        // Step 6 — Convert to sticker .webp
        const webpBuffer = await toStickerWebp(buffer);

        // Step 7 — Send sticker back
        const sentSticker = await sendSticker(chatId, webpBuffer);

        // Step 8 — React to the sticker with ✅
        if (sentSticker && sentSticker.message_id) {
            await setMessageReaction(chatId, sentSticker.message_id, "✅");
        }

        // Step 9 — Final message after 500ms
        await sleep(500);
        await sendMessage(chatId, "stikernya udah jadi! tap & hold buat save ke favorit ⭐");
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    // Always return 200 to prevent Telegram from retrying
    return new Response("OK", { status: 200 });
  }
}
