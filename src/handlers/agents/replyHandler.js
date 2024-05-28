const { codeOperators } = require('../../const');

module.exports = async function replyHandler(ctx, next) {
    if (!codeOperators.includes(ctx.from.id)) {
        return next();
    }

    const messageText = ctx.message.text;
    const destId = ctx.session.replyId;

    if (!destId) {
        console.error('replyId is not set in session');
        return ctx.reply('Произошла ошибка: не задан ID получателя.');
    }

    try {
        await ctx.telegram.sendMessage(destId, `Сообщение от оператора:\n\n${messageText}`);
    } catch (error) {
        console.error('Error sending message:', error);
        ctx.reply('Произошла ошибка при отправке сообщения.');
    }
};
