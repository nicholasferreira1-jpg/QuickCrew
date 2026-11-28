// Database connection
// Uses PostgreSQL in production (DATABASE_URL) and SQLite for local development.
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
          dialect: 'postgres',
          logging: false,
          dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
      })
    : new Sequelize({
          dialect: 'sqlite',
          storage: process.env.DB_STORAGE || './database.sqlite',
          logging: false,
          retry: { match: [/SQLITE_BUSY/], max: 5 }, // Wait and retry if another claim is saving
      });  

module.exports = sequelize;