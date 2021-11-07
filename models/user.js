'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // User.belongsToMany(models.Class, { through: models.User_Class })

        }
    };
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        gg_account: DataTypes.STRING,
        fb_account: DataTypes.STRING,
        avatar: DataTypes.STRING,
        student_id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};