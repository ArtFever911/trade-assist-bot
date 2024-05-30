const { Markup } = require("telegraf");
const { MarketDataRepository } = require("../../../repositories");
const { buttons } = require("../constants");

const funding = async (ctx) => {
    const start = Date.now();
    const { data } = await MarketDataRepository.getFundingInfo();
    console.log(``)
    return ctx.reply(
        data + `(Request took - ${Date.now() - start} ms)`,
        Markup.keyboard(buttons.start).oneTime().resize()
    );
}

module.exports = funding;