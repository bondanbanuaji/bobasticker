async function helpHandler(sock, msg, prefix) {
  const helpText = `╔══════════════════════╗
     *🧋 BOBA STICKER BOT*
╚══════════════════════╝

_Ubah foto jadi stiker WA dalam hitungan detik!_
_Gratis, cepat, dan tanpa simpan data._

━━━━━━━━━━━━━━━━━━━━━━
  *📌 DAFTAR COMMAND*
━━━━━━━━━━━━━━━━━━━━━━

🖼️ *STIKER*
┃
┣ \`${prefix}s\` — Bikin stiker dari gambar
┃   _Kirim gambar + caption_ \`${prefix}s\`
┃   _atau reply gambar lalu ketik_ \`${prefix}s\`
┃
┗ \`${prefix}sticker\` — _Alias dari_ \`${prefix}s\`

🛠️ *UTILITAS*
┃
┣ \`${prefix}ping\` — Cek kecepatan respons bot
┃
┗ \`${prefix}help\` — Tampilkan menu ini

━━━━━━━━━━━━━━━━━━━━━━
  *📖 CARA PAKAI*
━━━━━━━━━━━━━━━━━━━━━━

*① Kirim gambar baru*
    Pilih foto → caption \`${prefix}s\` → kirim

*② Reply gambar orang*
    Tap & hold gambar → Reply → \`${prefix}s\`

━━━━━━━━━━━━━━━━━━━━━━

> 💡 *Tips:* Bisa dipakai di DM maupun Grup!
> 🔒 Foto tidak disimpan — diproses di memory, langsung dibuang.
> ⚡ Powered by _Sharp_ · Format _WebP 512×512_

╔══════════════════════╗
   _© 2026 BobaSticker_
╚══════════════════════╝`;


  await sock.sendMessage(
    msg.key.remoteJid,
    { text: helpText },
    { quoted: msg }
  );
}

module.exports = helpHandler;
