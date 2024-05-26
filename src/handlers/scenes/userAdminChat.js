const { Scenes, Markup } = require('telegraf');
const { codeOperators, botMenu } = require('../../const');

const userAdminChatScene = new Scenes.BaseScene('USER_ADMIN_CHAT_SCENE');

userAdminChatScene.enter(async (ctx) => {
    await ctx.reply(
        '✉️ Напишите своё сообщение для технической поддержки.\nДля выхода из чата введите /quit'
    );
});

userAdminChatScene.hears(/\/quit/, async (ctx) => {
    await ctx.reply(
        'Здравствуйте! Вы обратились в тех.поддержку проекта Champion Casino.\nПо какому вопросу вы обращаетесь?',
        Markup.keyboard(botMenu).resize().oneTime()
    );
    ctx.scene.leave();
});

userAdminChatScene.on('message', async (ctx) => {
    const userId = ctx.from.id;
    const username = ctx.from.username || `User ${userId}`;
    const message = ctx.message.text;

    for (const operatorId of codeOperators) {
        await ctx.telegram.sendMessage(
            operatorId,
            `Обращение по категории: ${ctx.session.supportCategory}\n\nОт пользователя @${username}:\nid: ${userId}\nСообщение:\n\n${message}`,
            Markup.inlineKeyboard([
                Markup.button.callback('Ответить', `reply_${userId}`),
                Markup.button.callback('Отменить', `cancel_${userId}`)
            ])
        );
    }
});

module.exports = userAdminChatScene;
