const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Roles = sequelize.define('Roles', {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Roles;
