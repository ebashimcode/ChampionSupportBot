const { codeOperators } = require('../../const');

module.exports = async function replyHandler(ctx, next) {
  if (codeOperators.indexOf(ctx.from.id) === -1) {
    next();
    return;
  }

  const repliedMessage = ctx.message.reply_to_message;

  if (!repliedMessage) {
    console.log('no-reply-message');
    return next();
  }

  const messageText = repliedMessage.text;

  const regexMatch = messageText.match(/#id(\d{10})$/);

  if (regexMatch === null) {
    console.log('regex null');
    return next();
  }

  const destId = regexMatch[1];

  await ctx.telegram.sendMessage(destId, `Сообщение от оператора:\n\n${ctx.message.text}`);
};
