require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.PORT
process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
      host: '127.0.0.1',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    };

module.exports = sequelize;
