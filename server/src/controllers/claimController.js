// Controller Layer: handles claim requests and send responses.
const claimService = require('../services/claimService');

async function postClaim(req, res) {
    try {
        const jobId = Number(req.params.id);
        const result = await claimService.claimSpot(jobId, req.body.workerName);
        res.status(201).json(result);

    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }

        console.error(error);
        res.status(500).json({ error: 'Something went wrong. Please try again'});
    }
}

module.exports = { postClaim };