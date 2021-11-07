'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grades extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Grade.belongsTo(models.Topic, { foreignKey: 'topic_id' });
            // Grade.belongsTo(models.User, { foreignKey: 'user_id' });
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