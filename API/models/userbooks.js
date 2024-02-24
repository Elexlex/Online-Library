const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Books = require('./book');
const Users = require('./users');

const UserBooks = sequelize.define('UserBooks', {
    userBookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

UserBooks.belongsTo(Users, { foreignKey: 'userId' });
UserBooks.belongsTo(Books, { foreignKey: 'bookId' });

module.exports = UserBooks;
