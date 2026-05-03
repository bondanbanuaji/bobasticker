/**
 * Telegram Webhook Route Handler.
 *
 * Flow:
 * 1. Validate secret token header
 * 2. Parse Telegram update
 * 3. Download photo from Telegram CDN
 * 4. Convert to 512×512 .webp via Sharp
 * 5. Send back as sticker
 */

import { NextRequest } from "next/server";
import { getFile, downloadFile, sendSticker, sendMessage } from "@/lib/telegram";
import { toStickerWebp } from "@/lib/imageProcessor";

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

    // Handle /start command
    if (message.text === "/start") {
      await sendMessage(
        chatId,
        "👋 <b>Halo! Selamat datang di StikerKu Bot!</b>\n\n" +
          "📸 Kirim foto apa saja, dan aku akan langsung mengubahnya jadi stiker.\n\n" +
          "✨ Langsung kirim foto sekarang!"
      );
      return new Response("OK", { status: 200 });
    }

    // Check if message contains a photo
    if (!message.photo) {
      await sendMessage(
        chatId,
        "📸 Kirim foto ya! Aku hanya bisa mengubah foto jadi stiker."
      );
      return new Response("OK", { status: 200 });
    }

    // Step 3 — Download photo from Telegram CDN
    // photo array is sorted small → large, take the largest
    const fileId = message.photo.at(-1).file_id;
    const filePath = await getFile(fileId);
    const buffer = await downloadFile(filePath);

    // Step 4 — Convert to sticker .webp
    const webpBuffer = await toStickerWebp(buffer);

    // Step 5 — Send sticker back
    await sendSticker(chatId, webpBuffer);

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    // Always return 200 to prevent Telegram from retrying
    return new Response("OK", { status: 200 });
  }
}
