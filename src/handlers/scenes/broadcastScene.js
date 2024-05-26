const { Scenes } = require('telegraf');
const { getAllUsers } = require('../../data/DB');

const broadcastScene = new Scenes.BaseScene('BROADCAST_SCENE');

broadcastScene.on('message', async (ctx) => {
    const message = ctx.message.text;
    const users = await getAllUsers();

    for (const userId of users) {
        await ctx.telegram.sendMessage(userId, message);
    }

    await ctx.reply('Сообщение было отправлено всем пользователям.');
    ctx.scene.leave();
    ctx.scene.enter('ADMIN_PANEL_SCENE');
});

module.exports = broadcastScene;
