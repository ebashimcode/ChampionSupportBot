const { Scenes, Markup } = require('telegraf');
const { codeOperators, botMenu } = require('../../const');
const getPlayerStats = require('../../data/getPlayerStats');

const userAdminChatScene = new Scenes.BaseScene('USER_ADMIN_CHAT_SCENE');

userAdminChatScene.enter(async (ctx) => {
    await ctx.reply(
        '✉️ Напишите своё сообщение для технической поддержки.\nДля выхода из чата введите /quit',
    );
});

userAdminChatScene.hears(/\/quit/, async (ctx) => {
    await ctx.reply(
        'Здравствуйте! Вы обратились в тех.поддержку проекта Champion Casino.\nПо какому вопросу вы обращаетесь?',
        Markup.keyboard(botMenu).resize().oneTime(),
    );
    ctx.scene.leave();
});

userAdminChatScene.on('message', async (ctx) => {
    const message = ctx.message.text;
    if (!message) {
        return ctx.reply('Сообщение не должно быть пустым.');
    }

    const userId = ctx.from.id;
    const username = ctx.from.username ? `@${ctx.from.username}` : `User ${userId}`;

    for (const operatorId of codeOperators) {
        try {
            const emptyStats = {
                balance: '???',
                todayDeposit: '???',
                weekDeposit: '???',
                monthDeposit: '???',
            };
            const playerStats = (await getPlayerStats(userId)) || emptyStats;

            await ctx.telegram.sendMessage(
                operatorId,
                `Обращение по категории: ${
                    ctx.session.supportCategory || 'Не указана'
                }\n\nОт пользователя ${username}:\nid: ${userId}\nСообщение:\n\n${message}.\n\nБаланс: ${
                    playerStats.balance
                }\nВнесено сегодня: ${playerStats.todayDeposit}\nВнесено за неделю: ${
                    playerStats.weekDeposit
                }\nВнесено за месяц: ${playerStats.monthDeposit}\n`,
                Markup.inlineKeyboard([
                    Markup.button.callback('Ответить', `reply_${userId}`),
                    Markup.button.callback('Отменить', `cancel_${userId}`),
                ]),
            );
        } catch (error) {
            console.error(`Error sending message to operator ${operatorId}:`, error);
        }
    }
});

userAdminChatScene.action(/reply_(\d+)/, async (ctx) => {
    const userId = ctx.match[1];
    ctx.session.replyId = userId; // Устанавливаем replyId в сессии
    await ctx.reply(`Напишите ваш ответ пользователю с id: ${userId}`);

    ctx.scene.state.replyingTo = userId;
    ctx.scene.enter('OPERATOR_REPLY_SCENE');
});

userAdminChatScene.action(/cancel_(\d+)/, async (ctx) => {
    const userId = ctx.match[1];
    await ctx.reply(`Вы отменили ответ пользователю с id: ${userId}`);
});

module.exports = {
    userAdminChatScene,
};
