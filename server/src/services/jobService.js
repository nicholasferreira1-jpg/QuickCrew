// Business logic layer: creates and reads jobs.
// Controllers call these functions instead of talking to the database directly.
const Job = require('../models/Job');
const { validateJobData } = require('./jobValidator');
const { Job, Claim } = require('../models');

async function createJob(data) {
    const errors = validateJobData(data);

    if (errors.length > 0) {
        const error = new Error('Invalid job data');
        error.status = 400;
        error.details = errors;
        throw error;
    }

    return Job.create(data);
}

async function getAllJobs() {
    return Job.findAll({
        include: [{ model: Claim, as: 'claims' }],
        order: [['date', 'ASC']],
    });
}

module.exports = { createJob, getAllJobs };