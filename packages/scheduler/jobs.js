const dotenv = require('dotenv');
const { getNotifiers } = require("../../repositories/notifiers");
const TelegramBot = require("../bot");

dotenv.config();

const EDGE_FUNCTIONS_HOST = process.env.EDGE_FUNCTIONS_HOST

const url = `${EDGE_FUNCTIONS_HOST}/api/funding`
const TIME = '*/5 * * * *';

const fundingJob = async () => {
    console.log('Funding job run')
    try {
        const bot = TelegramBot.getInstance().getBotInstance();
        const subscribers = getNotifiers();
        const response = await fetch(url);
        const { data } = await response.json();
        subscribers.forEach(id => bot.telegram.sendMessage(id, data))
    } catch (error) {
        console.log(error)
    }
}

module.exports = [
    { time: TIME, fn: fundingJob }
]
