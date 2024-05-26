const { codeOperators } = require('../../const');

module.exports = async function replyHandler(ctx, next) {
    if (!codeOperators.includes(ctx.from.id)) {
        return next();
    }

    const messageText = ctx.message.text;

    const destId = ctx.session.replyId;

    await ctx.telegram.sendMessage(destId, `Сообщение от оператора:\n\n${ctx.message.text}`);
};
