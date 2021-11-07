'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Topic.belongsTo(models.Class, { foreignKey: 'class_id' });

        }
    };
    Topic.init({
        class_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Class',
                key: 'id'
            },
        },
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Topic',
    });
    return Topic;
};
