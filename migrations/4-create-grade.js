'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Grades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      class_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes',
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weight: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      is_finish: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Grades');
  }
};