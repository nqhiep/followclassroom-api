'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User_Class extends Model {
        static associate(models) {
            User_Class.belongsTo(models.Users, { foreignKey: 'user_id' });
            User_Class.belongsTo(models.Classes, { foreignKey: 'class_id' });
        }
    };
    User_Class.init({
        class_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Classes',
                key: 'id'
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Users',
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
