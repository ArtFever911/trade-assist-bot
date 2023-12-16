const dotenv = require('dotenv');
const axios = require('axios');
const { getNotifiers } = require("../../repositories/notifiers");
const TelegramBot = require("../bot");

dotenv.config();

const EDGE_FUNCTIONS_HOST = process.env.EDGE_FUNCTIONS_HOST

const url = `${EDGE_FUNCTIONS_HOST}/api/funding`
const TIME = '*/30 * * * *';

const fundingJob = async () => {
    console.log('Funding job run')
    try {
        const bot = TelegramBot.getInstance().getBotInstance();
        const subscribers = getNotifiers();
        const response = await axios.get(url);
        const { data: { data } } = await response;
        subscribers.forEach(id => bot.telegram.sendMessage(id, data))
    } catch (error) {
        console.log(error)
    }
}

module.exports = [
    { time: TIME, fn: fundingJob }
]
