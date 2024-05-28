// index.js (src/scenes)
const { Scenes } = require('telegraf');
const adminPanelScene = require('./adminPanelScene');
const broadcastScene = require('./broadcastScene');
const { userAdminChatScene, operatorReplyScene } = require('./userAdminChat');

const stage = new Scenes.Stage([adminPanelScene, operatorReplyScene, broadcastScene, userAdminChatScene]);

module.exports = stage;
