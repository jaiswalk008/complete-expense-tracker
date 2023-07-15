const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const ResetPassword = sequelize.define('forgotpasswordrequests',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
    }
})
module.exports = ResetPassword;