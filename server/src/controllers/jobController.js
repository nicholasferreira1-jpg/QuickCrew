// Controller layer (MVC): receives requests, calls the service, sends responses.
const jobService = require('../services/jobService');

async function postJob(req, res) {
    try {
        const job = await jobService.createJob(req.body);
        res.status(201).json(job);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ errors: error.details });
        }
        console.error(error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}

async function listJobs(req, res) {
    try {
        const jobs = await jobService.getAllJobs();
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not load jobs.' });
    }
}

module.exports = { postJob, listJobs };