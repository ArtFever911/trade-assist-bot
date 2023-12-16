const { TelegramBot, Scheduler } = require('./packages');
const unexpectedErrorHandler = (error) => {
    console.error(error);
    process.exit();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
TelegramBot.getInstance().init();
Scheduler.getInstance().init()