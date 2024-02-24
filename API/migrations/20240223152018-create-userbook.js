'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('UserBooks', {
      userBookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      bookId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Books',
          key: 'bookId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('UserBooks');
  },
};
