const startHandler = require('./commands/startHandler');
const supportHandler = require('./commands/supportHandler');
const replyHandler = require('./agents/replyHandler');
const faqHandler = require('./commands/faqHandler');

module.exports = (bot) => {
  startHandler(bot);
  bot.hears(/.*/, replyHandler);
  bot.action(/faq_.*/, faqHandler);
  bot.command('support', supportHandler(bot));
};
