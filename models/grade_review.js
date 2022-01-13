'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grade_Review extends Model {
        static associate(models) {
            Grade_Review.belongsTo(models.Scores, { foreignKey: 'score_id' });
        }
    };
    Grade_Review.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        score_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Scores',
                key: 'id'
            },
        },
        expected_score: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        student_explanation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_review_done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        sequelize,
        modelName: 'Grade_Review',
    });
    return Grade_Review;
};
