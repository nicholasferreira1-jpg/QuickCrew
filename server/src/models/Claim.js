// Model Layer : one row per worker who claimed a spot ona  job. 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Claim = sequelize.define('Claim', {
    jobId: { type: DataTypes.INTEGER, allowNull: false },
    workerName: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'claimed' },
});

module.exports = Claim;