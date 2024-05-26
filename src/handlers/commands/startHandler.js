const { Markup } = require('telegraf');
const scenes = require('../scenes/scenes');
const { botMenu } = require('../../const');

module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.reply(
        'Здравствуйте! Вы обратились в тех.поддержку проекта Champion Casino.\nПо какому вопросу вы обращаетесь?',
        Markup.keyboard(botMenu)
            .resize()
            .oneTime()
    );
  });

  const categories = [
    { command: 'Ввод средств 💸', category: 'Ввод средств 💸' },
    { command: 'Вывод средств 💸', category: 'Вывод средств 💸' },
    { command: 'Проблемы с игрой 🎰', category: 'Проблемы с игрой 🎰' },
    { command: 'Сотрудничество 👥', category: 'Сотрудничество 👥' },
    { command: 'Написать оператору 📞', category: 'Написать оператору 📞' },
  ];

  categories.forEach(({ command, category }) => {
    bot.hears(command, (ctx) => {
      ctx.reply('Оператор скоро с вами свяжется, ожидайте.');
      ctx.session.supportCategory = category;
      ctx.scene.enter(scenes.userAdminChat);
    });
  });
};
