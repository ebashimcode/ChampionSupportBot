const startHandler = require('./commands/startHandler');
const supportHandler = require('./commands/supportHandler');
const replyHandler = require('./agents/replyHandler');

module.exports = (bot) => {
  startHandler(bot);
  bot.command('support', supportHandler(bot));
  bot.use(replyHandler);
};
