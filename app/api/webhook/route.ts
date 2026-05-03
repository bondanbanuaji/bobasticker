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

    // Handle /start command
    if (message.text === "/start") {
      await sendMessage(
        chatId,
        "👋 <b>Halo! Selamat datang di BobaSticker!</b>\n\n" +
          "📸 Kirim foto apa saja, dan aku akan langsung mengubahnya jadi stiker.\n\n" +
          "✨ Langsung kirim foto sekarang!"
      );
      return new Response("OK", { status: 200 });
    }

    // Check if message contains a photo
    if (!message.photo) {
      await sendMessage(
        chatId,
        "kirim atau quote gambar dulu ya! 📸"
      );
      return new Response("OK", { status: 200 });
    }

    // Step 3 — React to user message with ⏳
    await setMessageReaction(chatId, messageId, "⏳");

    // Step 4 — Send initial text
    await sendMessage(chatId, "oke oke, lagi gua proses dulu ya... ");

    // Step 5 — Download and Send intermediate text
    // photo array is sorted small → large, take the largest
    const fileId = message.photo.at(-1).file_id;
    const filePath = await getFile(fileId);
    
    // We do download and send message in parallel like WA bot
    const [buffer] = await Promise.all([
        downloadFile(filePath),
        sendMessage(chatId, "sabar ya bestie, bentar lagi jadi nih")
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

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    // Always return 200 to prevent Telegram from retrying
    return new Response("OK", { status: 200 });
  }
}
