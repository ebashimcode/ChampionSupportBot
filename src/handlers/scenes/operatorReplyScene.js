const { Scenes } = require('telegraf');

const operatorReplyScene = new Scenes.BaseScene('OPERATOR_REPLY_SCENE');

operatorReplyScene.enter(async (ctx) => {
    await ctx.reply('Введите сообщение для отправки пользователю:');
});

operatorReplyScene.on('message', async (ctx) => {
    const userId = ctx.scene.state.replyingTo;
    const message = ctx.message.text;

    if (userId) {
        try {
            await ctx.telegram.sendMessage(userId, `Ответ от поддержки:\n\n${message}`);
            await ctx.reply('Сообщение отправлено пользователю.');
        } catch (error) {
            console.error(`Error sending message to user ${userId}:`, error);
            await ctx.reply('Произошла ошибка при отправке сообщения.');
        }
    } else {
        await ctx.reply('Произошла ошибка, не удалось отправить сообщение.');
    }

    ctx.scene.leave();
});

module.exports = {
    operatorReplyScene,
};
