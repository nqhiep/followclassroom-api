'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Scores extends Model {
        static associate(models) {
            Scores.belongsTo(models.Grades, { foreignKey: 'grade_id' });
        }
    };
    Scores.init({
        grade_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Grades',
                key: 'id'
            },
        },
        student_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        score: DataTypes.FLOAT,
        score_based_weight: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Scores',
    });
    return Scores;
};