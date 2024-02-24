'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    
    await queryInterface.createTable('Authors', {
      authorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    await queryInterface.createTable('Books', {
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
      genreId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Genres',
          key: 'genreId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      authorId: { 
        type: DataTypes.INTEGER,
        references: {
          model: 'Authors',
          key: 'authorId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    await queryInterface.createTable('BookAuthors', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'bookId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Authors',
          key: 'authorId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Authors');
    await queryInterface.dropTable('Books');
    await queryInterface.dropTable('BookAuthors');
  },
};
