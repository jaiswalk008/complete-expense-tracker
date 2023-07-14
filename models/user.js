const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false
    },
    premium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false 
    },
    totalExpense:{
        type:Sequelize.DECIMAL,
        defaultValue:0
    }

})
module.exports = User;