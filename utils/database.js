const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense-database','root','karan123',{dialect : 'mysql',host:'localhost'});

module.exports = sequelize;