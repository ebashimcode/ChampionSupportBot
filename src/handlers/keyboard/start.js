const { Markup } = require('telegrafjs');
const { getMenuKeyboard } = require('telegrafjs');
const registerUser = require('../../data/registerUser');

module.exports = async function startHandler(ctx) {
    ctx.session = ctx.session || {};

    if (!ctx.session?.isRegistered) {
        ctx.session.isRegistered = await registerUser(ctx.from.id);
    }

    await ctx.reply(
        'Добро пожаловать в бот технической и финансовой поддержки, по казино-боту Champion.',
        Markup.keyboard(getMenuKeyboard(ctx.update.message.from.id)),
    );
};