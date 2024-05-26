const dotenv = require('dotenv');
const { Telegraf } = require('telegraf');
const registerHandler = require('./handlers/registerHandlers');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const { stage } = require('./handlers/scenes');

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error('bot token is not set');
}

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

bot.use(sessionMiddleware);
bot.use(stage.middleware());
registerHandler(bot);

bot
  .launch()
  .then(() => console.log('Bot started'))
  .catch((err) => console.error('Failed to launch bot', err));