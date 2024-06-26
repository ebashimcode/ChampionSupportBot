const { codeOperators } = require('../../const');
const { addUser, userExists } = require('../../data/DB');
const { Markup } = require('telegraf');

module.exports = function supportHandler(bot) {
  registerHandlers(bot);

  bot.on('message', async (ctx) => {
    if (ctx.session.supportMode) {
      const userId = ctx.from.id;
      const username = ctx.from.username || `User ${userId}`;
      const userMessage = ctx.message.text;

      const exists = await userExists(userId);
      if (!exists) {
        await addUser(username, userId);
      }

      for (const operatorId of codeOperators) {
        await ctx.telegram.sendMessage(operatorId, `Обращение по категории: ${ctx.session.supportCategory}\n\nСообщение от ${username}:\n\n${userMessage}\n\n#id${userId}`);
      }

      ctx.reply('Оператор скоро с вами свяжется, ожидайте.');
      ctx.session.supportMode = false;
    }
  });

  return (ctx) => {
    ctx.reply(
      '✉️ Напишите своё сообщение для технической поддержки.',
      Markup.keyboard([Markup.button.callback('Отмена', 'staffDeny')]).oneTime()
    );
    ctx.session.supportMode = true;
  };
};

function registerHandlers(bot) {
  bot.action(/^staffDeny$/, staffDeny);
}

function staffDeny(ctx) {
  ctx.session.supportMode = false;
  ctx.reply('Вы вернулись в меню казино-бота.');
}
