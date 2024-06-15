const { Scenes } = require('telegraf');

const adminReplyScene = new Scenes.BaseScene('ADMIN_REPLY_SCENE');

adminReplyScene.enter(async (ctx) => {
    await ctx.reply('Введите  сообщение для отправки пользователю:');
});

adminReplyScene.on('mssage', async (ctx) => {
    const userId = ctx.scene.state.replyingTo;
    const message = ctx.message.text;

    if (userId) {
        try {
            await ctx.telegram.sendMessage(userId, `Ответ от оператора:\n\n${message}`);
            await ctx.reply('Сообщение отправлено пользователю');
        } catch (error) {
            console.error('Error sending message to user ${userId};', error);
            await ctx.reply('Произошла ошибка при отправке сообщения. Подробнее в логах.');
        }
    } else {
        await ctx.reply('Произошла ошибка, не удалось отправить сообщение.');
    }

    ctx.scene.leave();
});

module.exports = {
    adminReplyScene,
};