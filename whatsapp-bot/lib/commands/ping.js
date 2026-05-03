async function pingHandler(sock, msg) {
  const start = Date.now();
  
  // React to show we received it
  await sock.sendMessage(msg.key.remoteJid, { react: { text: '🏓', key: msg.key } });
  
  const end = Date.now();
  const ping = end - start;
  
  await sock.sendMessage(
    msg.key.remoteJid,
    { text: `🏓 Pong! Speed: ${ping}ms` },
    { quoted: msg }
  );
}

module.exports = pingHandler;
