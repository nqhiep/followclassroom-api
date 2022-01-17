'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notifications extends Model {
        static associate(models) {
            Notifications.belongsTo(models.Users, { foreignKey: 'user_id' });
            Notifications.belongsTo(models.Classes, { foreignKey: 'class_id' });
        }
    };
    Notifications.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
        class_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Classes',
                key: 'id'
            },
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        is_view: DataTypes.ARRAY(DataTypes.BOOLEAN),
    }, {
        sequelize,
        modelName: 'Notifications',
    });
    return Notifications;
};