const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Genre = require('./genre'); 
const Author = require('./author');

const Book = sequelize.define('Book', {
    bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

const BookAuthor = sequelize.define('BookAuthor', {}); 
const BookGenre = sequelize.define('BookGenre', {});

Book.belongsToMany(Genre, { through: BookGenre, foreignKey: 'bookId' });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: 'genreId' });

Book.belongsToMany(Author, { through: BookAuthor, foreignKey: 'bookId', otherKey: 'authorId' });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: 'authorId', otherKey: 'bookId' });


module.exports = Book;
