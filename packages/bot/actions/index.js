const about = require('./about');
const funding = require('./funding');
const start = require('./start');
const subscriptions = require('./subscriptions');


module.exports = {
    about,
    funding,
    start,
    main: start,
    ...subscriptions,
}