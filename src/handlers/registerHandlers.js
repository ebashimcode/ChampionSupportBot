const startHandler = require('./commands/startHandler');
const supportHandler = require('./commands/supportHandler');
const replyHandler = require('./agents/replyHandler');
const { codeOperators } = require('../const');

module.exports = (bot) => {
  startHandler(bot);
  bot.hears(/.*/, replyHandler);
  bot.command('support', supportHandler(bot));

  bot.command('admin', (ctx) => {
    if (codeOperators.includes(ctx.from.id)) {
      ctx.scene.enter('ADMIN_PANEL_SCENE');
    } else {
      ctx.reply('У вас нет доступа к этой команде.');
    }
  });
};