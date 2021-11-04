const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('d6mjh0tj6jfstd', 'tijrpiymnlgqgk', '8dc32830b108cd26e89bc6f0596fedb2dc5577526b5e7740ce998270201b44ce', {
  host: 'ec2-54-159-244-207.compute-1.amazonaws.com',
  dialect: 'postgres',
  logging: false,
  "logging": false,
  "dialectOptions": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  }
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = connectDb;