const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Genre = sequelize.define('Genre', {
    genreId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Genre;