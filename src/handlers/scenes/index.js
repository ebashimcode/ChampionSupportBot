const { Scenes } = require('telegraf');

const userAdminChatScene = require('./userAdminChat');
const { scenes } = require('./scenes');

const stage = new Scenes.Stage([userAdminChatScene]);

module.exports = {
    scenes,
    stage,
};
