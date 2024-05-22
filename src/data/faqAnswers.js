const { Markup } = require('telegraf');

const depositProblems = [
    Markup.button.callback('Проблема 1', 'faq_deposit_trouble1'), Markup.button.callback('Проблема 2', 'faq_deposit_trouble2'),
    Markup.button.callback('Проблема 3', 'faq_deposit_trouble3'), Markup.button.callback('Проблема 4', 'faq_deposit_trouble4'),
];

module.exports = {
    depositProblems
}
