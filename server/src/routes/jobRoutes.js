//Routes: connect each API endpoint to a controller function.
const express = require('express');
const { postJob, listJobs } = require('../controllers/jobController');

const router = express.Router();

router.post('/', postJob);  // POST /api/jobs
router.get('/', listJobs);  // GET  /api/jobs

module.exports = router;