const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const expense = new Schema({
    expenseName:{
        type:String,
        required:true,
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.model('Expense',expense);


// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Expense = sequelize.define('expense',{
//     id:{
//         type: Sequelize.INTEGER,
//         primaryKey:true,
//         allowNull:false,
//         autoIncrement:true
//     },
//     amount:{
//         type:Sequelize.DECIMAL,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })
// module.exports= Expense;