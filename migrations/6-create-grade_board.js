'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Grade_Board', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            class_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Classes',
                    key: 'id'
                }
            },
            student_id: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            fullname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            gpa: {
                type: Sequelize.FLOAT,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Grade_Board');
    }
};