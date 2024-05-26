const { Scenes } = require('telegraf');
const adminPanelScene = require('./adminPanelScene');
const broadcastScene = require('./broadcastScene');
const userAdminChatScene = require('./userAdminChat');


const stage = new Scenes.Stage([adminPanelScene, broadcastScene, userAdminChatScene]);

module.exports = stage;
