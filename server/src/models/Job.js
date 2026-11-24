// Model layer (MVC): defines how a job is stored in the database.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
    // For the MVP, jobs store the business name directly.
    // In Sprint 2 this becomes a link to the Businesses table.
    businessName: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.STRING, allowNull: false },
    hours: { type: DataTypes.FLOAT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    payPerHour: { type: DataTypes.FLOAT, allowNull: false },
    spotsNeeded: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'Open' },
});

module.exports = Job;