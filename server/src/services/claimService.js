const { Transaction } = require('sequelize');
const sequelize = require('../config/database');
const { Job, Claim } = require('../models');
const { canClaimSpot, getJobStatus } = require('./claimRules');

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

async function claimSpot(jobId, workerName) {
    return sequelize.transaction({ type: Transaction.TYPES.IMMEDIATE }, async (t) => {
        const job = await Job.findByPk(jobId, { transaction: t, lock: t.LOCK.UPDATE });

        if (!job) {
            throw createError(404, 'Job not found.');
        }

        // Read the current claims inside the lock, so the count is always up to date

        const claims = await Claim.findAll({ where: { jobId }, transaction: t });

        const ruleError = canClaimSpot(job, claims, workerName);
        if (ruleError) {
            // A missing name is a bad request (400)
            const hasName = (workerName || '').trim() !== '';
            throw createError(hasName ? 409 : 400, ruleError);
        }
        const claim = await Claim.create({ jobId, workerName: workerName.trim() }, { transaction: t });

        // Mark the job Filled if this was the last spot

        job.status = getJobStatus(job, [...claims, claim]);
        await job.save({ transaction: t });

        return { claim, job };
    })
}

module.exports = { claimSpot };