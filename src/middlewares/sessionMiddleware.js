const session = {};

module.exports = (ctx, next) => {
  const chatId = ctx.chat.id;

  if (!session[chatId]) {
    session[chatId] = {};
  }

  ctx.session = session[chatId];

  return next();
};
