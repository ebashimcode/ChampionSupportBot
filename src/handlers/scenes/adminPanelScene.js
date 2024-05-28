const { Scenes, Markup } = require('telegraf');
const { getUserCount } = require('../../data/DB');
const { adminMenu } = require('../../const');

const adminPanelScene = new Scenes.BaseScene('ADMIN_PANEL_SCENE');

adminPanelScene.enter(async (ctx) => {
    await ctx.reply(
        'Добро пожаловать в админ-панель. Выберите действие:',
        Markup.keyboard(adminMenu).resize().oneTime()
    );
});

adminPanelScene.hears('Статистика 📊', async (ctx) => {
    const userCount = await getUserCount();
    await ctx.reply(`Количество пользователей: ${userCount}`);
});

adminPanelScene.hears('Создать рассылку 📢', async (ctx) => {
    await ctx.reply('Введите сообщение для рассылки:');
    ctx.scene.enter('BROADCAST_SCENE');
});

adminPanelScene.hears('Назад 🔙', async (ctx) => {
    await ctx.reply(
        'Здравствуйте! Вы обратились в тех.поддержку проекта Champion Casino.\nПо какому вопросу вы обращаетесь?',
        Markup.keyboard(adminMenu).resize().oneTime()
    );
    ctx.scene.leave();
});

module.exports = adminPanelScene;
