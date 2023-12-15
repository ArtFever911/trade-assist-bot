const { Markup } = require('telegraf');
const createDebug = require('debug');
const { buttons } = require('../constants');
const debug = createDebug('bot:command_main');

const replyToMessage = (ctx, messageId, string) =>
    ctx.reply(string, {
        reply_to_message_id: messageId,
    });

const command = (ctx) => {
    debug('Called main menu')
    ctx.reply(
        "Main menu 📖",
        Markup.keyboard(buttons.start).oneTime().resize()
    )
}
module.exports = command;