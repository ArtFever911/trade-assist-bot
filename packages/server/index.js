const express = require('express');
const dotenv = require('dotenv');
const TelegramBot = require('../bot');
const { getNotifiers } = require('../../repositories/notifiers');

dotenv.config();

const PORT = process.env.PORT || 3000;

class Server {
    static #instance;
    constructor() {
        this.app = express();
        this.init = this.init.bind(this);
        this.configServer = this.configServer.bind(this);
        this.startServer = this.startServer.bind(this);
        this.getServerInstance = this.getServerInstance.bind(this);
    }

    init() {
        this.configServer();
        this.startServer();
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new Server();
        }
        return this.#instance;
    }

    //TODO: move this to routes file
    configServer() {
        // Middleware to parse JSON bodies
        this.app.use(express.json());

        // Health check
        this.app.get('/sla', (req, res) => {
            res.send('TG bot up and running');
        });

        // Send messages to the bot
        this.app.post('/notify', async (req, res) => {
            const { body, headers } = req;
            // add security check
            const { message, chatId } = body;
            if (!message) {
                res.status(403).json({ message: 'Missed message' });
                return;
            }
            const bot = TelegramBot.getInstance().getBotInstance();
            if (chatId) {
                bot.telegram.sendMessage(chatId, message);
                res.json({ message: 'OK' });
                return;
            }
            const subscribers = getNotifiers();
            if (!subscribers || !Array.isArray(subscribers) || !subscribers.length) {
                res.status(403).json({ message: 'Not found any chat to notify' });
                return;
            }
            subscribers.forEach(id => bot.telegram.sendMessage(id, message))
            res.json({ message: 'OK' });
        });

        // Error handling middleware
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }

    startServer() {
        // Start the server
        this.app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }

    getServerInstance() {
        return this.app;
    }
}

module.exports = Server;