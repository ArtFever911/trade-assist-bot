const cron = require('node-cron');
const { v4: uuidv4 } = require('uuid');
const createDebug = require('debug');
const jobs = require('./jobs');

const debug = createDebug('Scheduler:');

class Scheduler {
    static #instance;
    constructor() {
        this.jobs = {};
        this.init = this.init.bind(this);
        this.addJob = this.addJob.bind(this);
        this.runJob = this.runJob.bind(this);
        this.dropJob = this.dropJob.bind(this);
        this.addJobs = this.addJobs.bind(this);
        this.runJobs = this.runJobs.bind(this);
    }

    init() {
        debug('Scheduler started');
        console.log('Scheduler started');
        this.addJobs(jobs);
        this.runJobs();
    }

    // Public method to get the singleton instance
    static getInstance() {
        if (!this.#instance) {
            this.#instance = new Scheduler();
        }
        return this.#instance;
    }

    addJob(job) {
        const { time, fn } = job;
        if (typeof fn !== 'function') {
            throw new Error('Expected given function');
        }

        const id = uuidv4();
        const task = cron.schedule(time, fn, {
            scheduled: false
        });
        this.jobs[id] = task;

        console.log(`new job ${id} added`);
        debug(`new job ${id} added`);
    };

    runJob(id) {
        const task = this.jobs[id]
        task.start()
        debug(`job ${id} started`);
        console.log(`job ${id} started`);
    }

    dropJob(id) {
        const task = this.jobs[id];
        delete this.jobs.id;
        task.stop();
        debug(`job ${id} stopped`);
        console.log(`job ${id} stopped`);
    }

    runJobs() {
        console.log({ jobs: this.jobs })
        Object.keys(this.jobs).forEach(this.runJob)
    }

    addJobs(jobs = []) {
        jobs.forEach(this.addJob);
    }
}

module.exports = Scheduler;
