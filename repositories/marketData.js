const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
const REQUEST_TIMEOUT = 2000_0;
const EDGE_FUNCTIONS_HOST = process.env.EDGE_FUNCTIONS_HOST;
const DATA_REPO_ACCESS_TOKEN = process.env.DATA_REPO_ACCESS_TOKEN;
const url = `${EDGE_FUNCTIONS_HOST}/api/`;

class MarketDataRepository {
    constructor() {
        this.client = axios.create({
            baseURL: url,
            timeout: REQUEST_TIMEOUT,
            headers: { 'x-access-token': DATA_REPO_ACCESS_TOKEN }
        })

        this.getFundingInfo = this.getFundingInfo.bind(this);
    }

    async getFundingInfo() {
        const response = await this.client.get('/funding');
        const { data } = response;
        return data;
    }

    async getAnnouncements() {
        const response = await this.client.get('/announcements');
        const { data } = response;
        return data;
    }

    async getAllSymbols() {
        // once a week get all symbols and save into the file
        /**
         * - symbol name
         * - volume24
         * - volume4
         * - funding8
         * - maxAllTime
         * - currentPrice
         * -
         */
    }
}

module.exports = new MarketDataRepository();