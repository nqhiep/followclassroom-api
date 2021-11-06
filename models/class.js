'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Class.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        cover: DataTypes.STRING,
        student_link: DataTypes.STRING,
        teacher_link: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Class',
    });
    return Class;
};