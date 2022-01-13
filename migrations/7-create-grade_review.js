'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Grade_Review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      score_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Scores',
          key: 'id'
        }
      },
      expected_score: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      student_explanation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_review_done: {
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
    await queryInterface.dropTable('Grade_Review');
  }
};