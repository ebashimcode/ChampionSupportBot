const { Scenes, Markup } = require('telegraf');
const scenes = require('./scenes');
const { codeOperators, botMenu } = require('../../const');

const userAdminChatScene = new Scenes.BaseScene(scenes.userAdminChat);

userAdminChatScene.enter(enterStep);
userAdminChatScene.hears(/\/quit/, endScene);
userAdminChatScene.hears(/.*/, forwardMessageToAdmin);

module.exports = userAdminChatScene;

async function enterStep(ctx) {
  await ctx.reply(
    `Вы вошли в чат с оператором.

Вы должны будете перевести сумму депозита на указанные оператором реквизиты, затем вы получите код для входа в игру.

Чтобы закончить чат впишите команду /quit`,
  );
}

async function forwardMessageToAdmin(ctx) {
  const userId = ctx.from.id;
  const message = ctx.message.text;

  // Отправляем сообщение операторам
  for (const operatorId of codeOperators) {
    const username = ctx.from.username || `User ${userId}`;

    await ctx.telegram.sendMessage(
      operatorId,
      `Сообщение от ${username}:\n\n${message}\n\nОтветьте на это сообщение текстом которое хотите переслать пользователю\n\n#id${userId}`,
    );
  }
}

async function endScene(ctx) {
  ctx.reply(
    'Здравствуйте! Вы обратились в тех.поддержку проекта Champion Casino.\nПо какому вопросу вы обращаетесь?',
    Markup.keyboard(botMenu).resize().oneTime(),
  );

  ctx.scene.leave();
}
