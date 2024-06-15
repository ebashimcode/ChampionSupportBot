const startHandler = require('./commands/startHandler');
const supportHandler = require('./commands/supportHandler');
const replyHandler = require('./agents/replyHandler');
const { codeOperators } = require('../const');

module.exports = (bot) => {
  startHandler(bot);
  bot.hears(/.*/, replyHandler);
  bot.command('support', supportHandler(bot));

  bot.action(/reply_(\d+)/, (ctx => {
    ctx.session.replyId = ctx.match[1];
  }));

  bot.command('admin', (ctx) => {
    if (codeOperators.includes(ctx.from.id)) {
      ctx.scene.enter('ADMIN_MENU_SCENE');
    } else {
      ctx.reply('У вас нет доступа к этой команде.');
    }
  });
};