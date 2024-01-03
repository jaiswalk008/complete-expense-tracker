const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    totalExpense: {
        type: Number,
        default: 0
    },
    premium: {
        type: Boolean,
        default: false
    },
})

//mongoose.model creates a model User using the user schema
module.exports = mongoose.model('User',user);


// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const User = sequelize.define('user',{
//     id:{
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     name:{
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     password:{
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     premium: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false 
//     },
//     totalExpense:{
//         type:Sequelize.DECIMAL,
//         defaultValue:0
//     }

// })
// module.exports = User;