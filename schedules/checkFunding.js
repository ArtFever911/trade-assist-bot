const cron = require('node-cron');
const TIME = '30 * * * * *';

let task;

const job = {
    addJob: (fn) => {
        if (typeof fn !== 'function') {
            throw new Error('Expected given function');
        }
        task = cron.schedule(TIME, fn, {
            scheduled: false
        });
        console.log("Job added")
    },
    runJob: () => {
        console.log('Starting job');
        task.start()
    },
    dropJob: () => task.stop()
}

module.exports = job;