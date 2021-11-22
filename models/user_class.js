'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User_Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User_Class.init({
        class_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Class',
                key: 'id'
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'User',
                key: 'id'
            },
        },
        role: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, {
        freezeTableName: true,
        sequelize,
        modelName: 'User_Class',
    });
    return User_Class;
};
