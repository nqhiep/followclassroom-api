'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grade_Board extends Model {
        static associate(models) {
            Grade_Board.belongsTo(models.Classes, { foreignKey: 'class_id' });
            Grade_Board.belongsTo(models.Users, { foreignKey: 'user_id' });
        }
    };
    Grade_Board.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        class_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Classes',
                key: 'id'
            },
        },
        student_id: {
            type: DataTypes.STRING,
        },
        fullname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        gpa: {
            type: DataTypes.FLOAT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        }
    }, {
        freezeTableName: true,
        sequelize,
        modelName: 'Grade_Board',
    });
    return Grade_Board;
};
