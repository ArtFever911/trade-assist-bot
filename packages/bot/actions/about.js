const createDebug = require('debug');
const { author, name, version } = require('../../../package.json');

const debug = createDebug('bot:about_command');

const about = async (ctx) => {
    const message = `*${name} ${version}*\n${author}`;
    debug(`Triggered "about" command with message \n${message}`);
    return ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

module.exports = about;
