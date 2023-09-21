const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
    paymentId: { type: String },
    orderId: { type: String },
    status: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Order', order);

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Order = sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement: true,
//         primaryKey:true
//     },
//     paymentid:Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status:Sequelize.STRING
// })
// module.exports = Order;