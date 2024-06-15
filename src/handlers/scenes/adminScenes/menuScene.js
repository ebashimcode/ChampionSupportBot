const { Scenes, Markup } = require('telegraf');
const { adminMenu } = require('../../../const');
const { getUserCount } = require('../../../data/DB');

const adminMenuScene = new Scenes.BaseScene('ADMIN_MENU_SCENE');

adminMenuScene.enter(async (ctx) => {
    await ctx.reply(
        'Вы в Админ-панели, выберите действие:',
        Markup.keyboard(adminMenu).resize().oneTime()
    );
});

// Слушатели кнопок
adminMenuScene.hears('', async (ctx) => {
    const userCount = await getUserCount();
    await ctx.reply('Количество пользователей: ${userCount}');
});

adminMenuScene.hears('', async (ctx) => {
    await ctx.reply('Введите сообщение для рассылки:');
    ctx.scene.enter('BROADCAST_SCENE');
});

adminMenuScene.hears('', async (ctx) => {
    await ctx.reply(
        'Вы вернулись в главное меню',
        Markup.keyboard(adminMenu).resize().oneTime()
    );
    ctx.scene.leave();
});

module.exports = adminMenuScene;