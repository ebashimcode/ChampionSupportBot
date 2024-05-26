const { Scenes } = require('telegraf');
const userAdminChatScene = require('./userAdminChat');
const adminPanelScene = require('./adminPanelScene');
const broadcastScene = require('./broadcastScene');

const stage = new Scenes.Stage([userAdminChatScene, adminPanelScene, broadcastScene]);

module.exports = {
    stage,
};