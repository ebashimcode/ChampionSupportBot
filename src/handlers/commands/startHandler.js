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

  bot.hears('Ввод средств 💸', (ctx) => {
    ctx.reply('Оператор скоро с вами свяжется, ожидайте.');
    ctx.session.supportCategory = 'Ввод средств 💸';
    ctx.scene.enter(scenes.userAdminChat);
  });

  bot.hears('Вывод средств 💸', (ctx) => {
    ctx.reply('Оператор скоро с вами свяжется, ожидайте.');
    ctx.session.supportCategory = 'Вывод средств 💸';
    ctx.scene.enter(scenes.userAdminChat);
  });

  bot.hears('Проблемы с игрой 🎰', (ctx) => {
    ctx.reply('Оператор скоро с вами свяжется, ожидайте.');
    ctx.session.supportCategory = 'Проблемы с игрой 🎰';
    ctx.scene.enter(scenes.userAdminChat);
  });

  bot.hears('Сотрудничество 👥', (ctx) => {
    ctx.reply('Оператор скоро с вами свяжется, ожидайте.');
    ctx.session.supportCategory = 'Сотрудничество 👥';
    ctx.scene.enter(scenes.userAdminChat);
  });

  bot.hears('Написать оператору 📞', (ctx) => {
    ctx.reply('Оператор скоро с вами свяжется, ожидайте.');
    ctx.session.supportCategory = 'Написать оператору 📞';
    ctx.scene.enter(scenes.userAdminChat);
  });
};
