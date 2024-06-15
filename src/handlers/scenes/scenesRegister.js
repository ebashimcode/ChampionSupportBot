const { Scenes } = require('telegraf');
const adminMenuScene = require('./adminScenes/menuScene');
const broadcastScene = require('./adminScenes/broadcastScene');

const stage = new Scenes.Stage([adminMenuScenem, broadcastScene]);

module.exports = stage;