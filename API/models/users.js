const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Role = require('./roles');

const User = sequelize.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;
