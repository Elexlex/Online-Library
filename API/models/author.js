const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Author = sequelize.define('Author', {
    authorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Author;