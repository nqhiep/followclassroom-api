'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Classes', 'code', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('Classes', 'code_password', {
          type: Sequelize.STRING,
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Classes', 'code', { transaction: t }),
        queryInterface.removeColumn('Classes', 'code_password', { transaction: t })
      ])
    })
  }
};
