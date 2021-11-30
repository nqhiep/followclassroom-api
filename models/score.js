'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Scores extends Model {
        static associate(models) {
            Scores.belongsTo(models.Grades, { foreignKey: 'grade_id' });
            Scores.belongsTo(models.Users, { foreignKey: 'user_id' });
        }
    };
    Scores.init({
        grade_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Grades',
                key: 'id'
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        score: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Scores',
    });
    return Scores;
};