'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users',
        'isBanned',
        {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        },
        { transaction }
      )
      await transaction.commit();
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Users', 'isBanned', {transaction});
      await transaction.commit();
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
  }
};
