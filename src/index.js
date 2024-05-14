const dotenv = require('dotenv');
const { Telegraf, session } = require('telegraf');
const handlersHook = require('./handlers/handlersHook');

dotenv.config()

if (!process.env.BOT_TOKEN) {
  throw new Error('bot token is not set');
}

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);

handlersHook(bot);

bot.launch()