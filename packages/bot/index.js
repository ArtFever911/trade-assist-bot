const { Telegraf, Markup } = require('telegraf');
const dotenv = require('dotenv');
const { production, development } = require('./core');
const { commands } = require('./constants');
const actions = require('./actions');

const BOT_NAME = '@voice_of_madness_bot';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

class TelegramBot {
    static #instance;
    constructor() {
        this.bot = new Telegraf(BOT_TOKEN);
        if (ENVIRONMENT === 'production') {
            production(this.bot);
        } else {
            development(this.bot)
        }

        this.init = this.init.bind(this);
        this.setBotCommands = this.setBotCommands.bind(this);
        this.setBotActions = this.setBotActions.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getBotInstance = this.getBotInstance.bind(this);
    }

    init() {
        this.setBotCommands();
        this.setBotActions();

    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new TelegramBot();
        }
        return this.#instance;
    }

    setBotCommands() {
        this.bot.telegram.setMyCommands(commands);
    }

    setBotActions() {
        this.bot.hears(BOT_NAME, actions.main);
        Object.keys(actions).forEach(key => {
            this.bot.command(key, actions[key])
        })
    }

    async sendMessage(message, buttons) {
        await this.bot.reply(message, buttons)
    }

    getBotInstance() {
        return this.bot;
    }
}

module.exports = TelegramBot;