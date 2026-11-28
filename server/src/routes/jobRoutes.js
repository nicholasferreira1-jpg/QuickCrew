//Routes: connect each API endpoint to a controller function.
const express = require('express');
const { postJob, listJobs } = require('../controllers/jobController');
const { postClaim } = require('../controllers/claimController');
const { postClaim } = require('../controllers/claimController');

const router = express.Router();

router.post('/', postJob);  // POST /api/jobs
router.get('/', listJobs);  // GET  /api/jobs
router.post('/:id/claim', postClaim);   // POST /api/jobs/:id/claim


module.exports = router;