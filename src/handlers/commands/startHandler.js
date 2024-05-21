const { Markup } = require('telegraf');

module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.reply(
      'Здравствуйте! Вы обратились в тех.поддержку проекта Champion Casino.\nПо какому вопросу вы обращаетесь?',
      Markup.keyboard([
        ['Ввод средств 💸', 'Вывод средств 💸'],
        ['Проблемы с игрой 🎰', 'Сотрудничество 👥']
      ])
      .resize()
      .oneTime()
    );
  });

  bot.hears('Ввод средств 💸', (ctx) => {
    ctx.reply('Если у вас имеются проблемы по вводу средств, распишите все детали, оператор вам поможет.');
  });

  bot.hears('Вывод средств 💸', (ctx) => {
    ctx.reply('Если у вас имеются проблемы с выводом средств, распишите все детали, оператор вам поможет.');
  });

  bot.hears('Проблемы с игрой 🎰', (ctx) => {
    ctx.reply('Если у вас имеются проблемы с запуском игры, распишите все детали, оператор вам поможет.');
  });

  bot.hears('Сотрудничество 👥', (ctx) => {
    ctx.reply('Распишите ваши идеи, оператор с вами свяжется.');
  });
};