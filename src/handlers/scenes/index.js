// index.js (src/scenes)
const { Scenes } = require('telegraf');
const adminPanelScene = require('./adminPanelScene');
const broadcastScene = require('./broadcastScene');
const { userAdminChatScene } = require('./userAdminChat');
const { operatorReplyScene } = require('./operatorReplyScene');

const stage = new Scenes.Stage([adminPanelScene, operatorReplyScene, broadcastScene, userAdminChatScene]);

module.exports = stage;
