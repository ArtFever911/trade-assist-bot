const { TelegramBot, Server } = require('./packages');
const unexpectedErrorHandler = (error) => {
    console.error(error);
    process.exit();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    console.info('SIGTERM received');
});

TelegramBot.getInstance().init();
Server.getInstance().init();