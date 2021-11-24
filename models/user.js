'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasMany(models.User_Class, { foreignKey: 'user_id' });
            Users.hasMany(models.Grades);
        }
    };
    Users.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        gg_account: DataTypes.STRING,
        fb_account: DataTypes.STRING,
        avatar: DataTypes.STRING,
        student_id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Users',
    });
    return Users;
};