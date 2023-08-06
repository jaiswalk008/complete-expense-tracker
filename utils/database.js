
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DEFAULT_DATABASE_NAME,process.env.DB_USER,process.env.DEFAULT_DATABASE_PASSWORD,
                {dialect : 'mysql',host:process.env.DB_HOST});

module.exports = sequelize;