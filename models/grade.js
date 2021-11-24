'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grades extends Model {
        static associate(models) {
            Grades.belongsTo(models.Topics, { foreignKey: 'topic_id' });
            Grades.belongsTo(models.Users, { foreignKey: 'user_id' });
        }
    };
    Grades.init({
        topic_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Topics',
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
        modelName: 'Grades',
    });
    return Grades;
};