'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Classes extends Model {
        static associate(models) {
            Classes.hasMany(models.User_Class, { foreignKey: 'class_id' });
            Classes.hasMany(models.Grades, { foreignKey: 'class_id' });
        }
    };
    Classes.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        cover: DataTypes.STRING,
        student_link: DataTypes.STRING,
        teacher_link: DataTypes.STRING,
        grade_order: DataTypes.ARRAY(DataTypes.INTEGER),
    }, {
        sequelize,
        modelName: 'Classes',
    });
    return Classes;
};