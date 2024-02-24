const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'Phoenix$$2004',
  database: 'OnlineLibrary',
});

module.exports = sequelize;