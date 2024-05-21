const { Markup } = require('telegraf');
const { codeOperators } = require('../../const');
const { addUser, userExists } = require('../../data/DB');

module.exports = function supportHandler(bot) {
  registerHandlers(bot);

  bot.on('message', async (ctx) => {
    if (ctx.session.supportMode) {
      const userId = ctx.from.id;
      const username = ctx.from.username || `User ${userId}`;
      const userMessage = ctx.message.text;

      // Сохраняем пользователя в базе данных
      const exists = await userExists(userId);
      if (!exists) {
        await addUser(username, userId);
      }

      // Отправляем сообщение операторам
      for (const operatorId of codeOperators) {
        await ctx.telegram.sendMessage(operatorId, `Сообщение от ${username} (ID: ${userId}):\n\n${userMessage}\n\n#id${userId}`);
      }

      ctx.reply('Ваше сообщение отправлено операторам. Ожидайте ответа.');
      ctx.session.supportMode = false; // Выходим из режима поддержки после отправки сообщения
    }
  });

  return (ctx) => {
    ctx.reply(
      '✉️ Напишите своё сообщение для технической поддержки.',
      Markup.keyboard([Markup.button.callback('Отмена', 'staffDeny')]).oneTime()
    );
    ctx.session.supportMode = true; // Устанавливаем флаг режима поддержки
  };
};

function registerHandlers(bot) {
  bot.action(/^staffDeny$/, staffDeny);
}

function staffDeny(ctx) {
  ctx.session.supportMode = false;
  ctx.reply('Вы вернулись в меню казино-бота.');
}
