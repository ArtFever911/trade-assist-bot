const createDebug = require('debug');
const debug = createDebug('bot:dev');

const BOT_HOOK_URL = `${process.env.BOT_HOOK_URL}`;
const BOOT_HOOK_PORT = `${process.env.BOOT_HOOK_PORT}` || 3000;

const production = async (bot) => {
    debug('Bot runs in production mode');
    debug(`setting webhook: ${BOT_HOOK_URL}`);

    if (!BOT_HOOK_URL) {
        throw new Error('BOT_HOOK_URL is not set.');
    }

    const getWebhookInfo = await bot.telegram.getWebhookInfo();
    if (getWebhookInfo.url !== BOT_HOOK_URL) {
        debug(`deleting webhook ${BOT_HOOK_URL}`);
        await bot.telegram.deleteWebhook();
        debug(`setting webhook: ${BOT_HOOK_URL}`);
        await bot.telegram.setWebhook(`${BOT_HOOK_URL}:${BOOT_HOOK_PORT}`);
    }
    debug(`starting webhook on port: ${PORT}`);
};

module.exports = production;
