'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Series', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      sideimage: {
        type: Sequelize.STRING
      },
      publish: {
        type: Sequelize.BOOLEAN
      },
      price: {
        type: Sequelize.DECIMAL
      },
      bio: {
        type: Sequelize.TEXT
      },
      firstrow: {
        type: Sequelize.TEXT
      },
      secondrow: {
        type: Sequelize.TEXT
      },
      paragraph: {
        type: Sequelize.TEXT
      },
      video: {
        type: Sequelize.TEXT
      },
      release: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Series');
  }
};