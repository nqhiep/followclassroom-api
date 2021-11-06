'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grade extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Grade.init({
        topic_id: DataTypes.UUID,
        user_id: DataTypes.UUID,
        score: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Grade',
    });
    return Grade;
};