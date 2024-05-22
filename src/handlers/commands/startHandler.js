const { Markup } = require('telegraf');
const scenes = require('../scenes/scenes');
const { botMenu } = require('../../const');
const { depositProblems } = require('../../data/faqAnswers');

module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.reply(
      'Здравствуйте! Вы обратились в тех.поддержку проекта Champion Casino.\nПо какому вопросу вы обращаетесь?',
      Markup.keyboard(botMenu)
      .resize()
      .oneTime()
    );
  });

  bot.hears('Ввод средств 💸', (ctx) => {
    ctx.reply('Ответы на вопросы, связанные с депозитом средств.', Markup.inlineKeyboard(depositProblems));
  });

  bot.hears('Вывод средств 💸', (ctx) => {
    ctx.reply('Ответы на вопросы, связанные с выводом средств.', Markup.inlineKeyboard(depositProblems));
  });

  bot.hears('Проблемы с игрой 🎰', (ctx) => {
    ctx.reply('Ответы на вопросы, связанные с игрой в казино.', Markup.inlineKeyboard(depositProblems));
  });

  bot.hears('Сотрудничество 👥', (ctx) => {
    ctx.reply('Распишите ваши идеи, оператор с вами свяжется.');
    ctx.scene.enter(scenes.userAdminChat);
  });

  bot.hears('Написать оператору 📞', (ctx) => {
    ctx.scene.enter(scenes.userAdminChat);
  });
};
