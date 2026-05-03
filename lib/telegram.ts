/**
 * Telegram Bot API helper functions.
 * Raw fetch calls — no library needed.
 */

const BOT_TOKEN = process.env.BOT_TOKEN!;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * Get file path on Telegram CDN from file_id.
 */
export async function getFile(fileId: string): Promise<string> {
  const res = await fetch(`${API_BASE}/getFile?file_id=${fileId}`);
  const data = await res.json();

  if (!data.ok) {
    throw new Error(`getFile failed: ${JSON.stringify(data)}`);
  }

  return data.result.file_path;
}

/**
 * Download file binary from Telegram CDN into a Buffer.
 */
export async function downloadFile(filePath: string): Promise<Buffer> {
  const url = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`downloadFile failed: ${res.status} ${res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Send a sticker (webp buffer) to a chat.
 */
export async function sendSticker(
  chatId: number | string,
  webpBuffer: Buffer
): Promise<void> {
  const form = new FormData();
  form.append("chat_id", String(chatId));
  form.append(
    "sticker",
    new Blob([new Uint8Array(webpBuffer)], { type: "image/webp" }),
    "sticker.webp"
  );

  const res = await fetch(`${API_BASE}/sendSticker`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();
  if (!data.ok) {
    throw new Error(`sendSticker failed: ${JSON.stringify(data)}`);
  }
}

/**
 * Send a text message to a chat.
 */
export async function sendMessage(
  chatId: number | string,
  text: string
): Promise<void> {
  const res = await fetch(
    `${API_BASE}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}&parse_mode=HTML`
  );

  const data = await res.json();
  if (!data.ok) {
    throw new Error(`sendMessage failed: ${JSON.stringify(data)}`);
  }
}
