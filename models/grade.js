'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grades extends Model {
        static associate(models) {
            Grades.belongsTo(models.Classes, { foreignKey: 'class_id' });
            Grades.hasMany(models.Scores);
        }
    };
    Grades.init({
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
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        weight: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        order: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'Grades',
    });
    return Grades;
};
