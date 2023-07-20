require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DEFAULT_DATABASE_NAME,'root',process.env.DEFAULT_DATABASE_PASSWORD,
                {dialect : 'mysql',host:'localhost'});

module.exports = sequelize;