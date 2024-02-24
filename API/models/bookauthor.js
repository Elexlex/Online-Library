const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const BookAuthor = sequelize.define('BookAuthor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'bookId', 
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'authorId', 
    },
});

module.exports = BookAuthor;
