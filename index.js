const { TelegramBot, Scheduler } = require('./packages');

TelegramBot.getInstance().init();
Scheduler.getInstance().init()