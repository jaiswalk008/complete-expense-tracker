const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const resetPassword = new Schema({
    id: {
        type:String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}) 
module.exports = mongoose.model('ForgotPassword',resetPassword);

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const ResetPassword = sequelize.define('forgotpasswordrequests',{
//     id:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         primaryKey:true
//     },
//     isActive:{
//         type:Sequelize.BOOLEAN,
//         defaultValue:true
//     }
// })
// module.exports = ResetPassword;