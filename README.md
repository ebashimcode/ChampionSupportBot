# ChampionSupportBot

Бот поддержки, с использованием сцен.

## Библиотеки

- telegraf.js
- axios
- sqlite/sqlite3
- dotenv
- nodemon

## Структура бота

```shell
└───src
    │   const.js
    │   index.js
    │
    ├───data
    │       DB.js
    │       users.db
    │
    ├───handlers
    │   │   registerHandlers.js
    │   │
    │   ├───agents
    │   │       replyHandler.js
    │   │
    │   ├───admins
    │   │       startHandler.js
    │   │       supportHandler.js
    │   │
    │   └───scenes
    │           adminPanelScene.js
    │           broadcastScene.js
    │           index.js
    │           scenes.js
    │           userAdminChat.js
    │
    └───middlewares
            sessionMiddleware.js
```

## Энтрипоинт и обработка хандлеров

Входящий файл — `index.js`, находится в корне папки `src`.

```javascript
const dotenv = require('dotenv');
const { Telegraf, session } = require('telegraf');
const registerHandler = require('./handlers/registerHandlers');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const stage = require('./handlers/scenes');

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error('bot token is not set');
}

const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

bot.use(sessionMiddleware);
bot.use(session());
bot.use(stage.middleware());
registerHandler(bot);

bot.launch()
  .then(() => console.log('Bot started'))
  .catch((err) => console.error('Failed to launch bot', err));
```

Обработчик

```javascript
const startHandler = require('./admins/startHandler');
const supportHandler = require('./admins/supportHandler');
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
```