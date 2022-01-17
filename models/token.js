'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {};
  Tokens.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING  
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM(['active_account', 'reset_password'])
    },
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};