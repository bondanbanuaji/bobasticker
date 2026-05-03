function isRelevantMessage(msg) {
  // Check if message has text or image
  const messageContent = msg.message;
  if (!messageContent) return false;

  const type = Object.keys(messageContent)[0];
  return (
    type === 'conversation' ||
    type === 'extendedTextMessage' ||
    type === 'imageMessage'
  );
}

function getCommandAndArgs(msg, prefix) {
  let text = '';
  const messageContent = msg.message;

  if (messageContent.conversation) {
    text = messageContent.conversation;
  } else if (messageContent.extendedTextMessage) {
    text = messageContent.extendedTextMessage.text;
  } else if (messageContent.imageMessage) {
    text = messageContent.imageMessage.caption || '';
  }

  if (!text.startsWith(prefix)) return { command: null, args: [] };

  const args = text.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  return { command, args };
}

module.exports = { isRelevantMessage, getCommandAndArgs };
