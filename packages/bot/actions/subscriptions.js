const { Markup } = require('telegraf');
const { buttons } = require('../constants');
const { isIdSubscribed, addNotification, removeNotification, getNotifiers } = require('../../../repositories/notifiers');

const subscriptions = async (ctx) => {
    const { chat: { id } } = ctx;
    const status = isIdSubscribed(id);
    const message = status ? 'Subscribed ✔️' : 'Not subscribed ❌';
    const button = status ? ['/unsubscribe', '/main'] : ['/subscribe', '/main']
    return ctx.reply(
        message,
        Markup.keyboard(button).oneTime().resize()
    );
}

const unsubscribe = async (ctx) => {
    const { chat: { id } } = ctx;
    console.log({ id })
    try {
        removeNotification(id);
        await ctx.reply(
            `ID - ${id} unsubscribed from bot notifications`,
            Markup.keyboard(buttons.subscribe).oneTime().resize()
        )
    } catch (error) {
        await ctx.reply(error.message);
    }
}

const subscribe = async (ctx) => {
    const { chat: { id } } = ctx;
    try {
        const status = isIdSubscribed(id);
        if (status) {
            await ctx.reply(`ID - ${id} already subscribed`);
            return;
        }
        addNotification(id);
        await ctx.reply(
            `ID - ${id} subscribed to bot notifications`,
            Markup.keyboard(buttons.unsubscribe).oneTime().resize()
        )
    } catch (error) {
        await ctx.reply(error.message);
    }
}

module.exports = {
    subscribe,
    unsubscribe,
    subscriptions
}