'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'password', {
          allowNull: true,
          type: Sequelize.DataTypes.STRING
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'password', {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        }, { transaction: t })
      ]);
    });
  }
}

