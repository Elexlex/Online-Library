const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const BookGenre = sequelize.define('BookGenre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = BookGenre;