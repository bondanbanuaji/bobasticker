async function helpHandler(sock, msg, prefix) {
  const helpText = `*🤖 BOBA STICKER WA BOT*

Ubah foto jadi stiker WA dalam hitungan detik!
Gratis, cepat, dan tanpa simpan data.

*📌 DAFTAR COMMAND:*

➔ *${prefix}s* atau *${prefix}sticker*
Kirim gambar dengan caption ${prefix}s, atau reply gambar orang lain dengan ${prefix}s. Bot akan membalas dengan stiker!

➔ *${prefix}ping*
Cek kecepatan respons bot.

➔ *${prefix}help*
Tampilkan pesan bantuan ini.

*💡 Tips:* 
Bisa dipakai di Grup juga loh! Tinggal masukkan bot ke grup dan pakai command di atas.
`;

  await sock.sendMessage(
    msg.key.remoteJid,
    { text: helpText },
    { quoted: msg }
  );
}

module.exports = helpHandler;
