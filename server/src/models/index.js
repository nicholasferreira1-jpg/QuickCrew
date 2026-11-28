// Loads all models and sets up how they relate to each other.
const Job = require('./Job');
const Claim = require('./Claim');

// One job has many claims; each claim belongs to one job
Job.hasMany(Claim, { foreignKey: 'jobId', as: 'claims' });
Claim.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = { Job, Claim };