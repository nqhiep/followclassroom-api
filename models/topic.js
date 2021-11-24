'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topics extends Model {
        static associate(models) {
            Topics.belongsTo(models.Classes, { foreignKey: 'class_id' });
            Topics.hasMany(models.Grades);
        }
    };
    Topics.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        class_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Classes',
                key: 'id'
            },
        },
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Topics',
    });
    return Topics;
};
