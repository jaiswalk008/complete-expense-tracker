const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const sequelize = require('./utils/database');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premiumRoutes');

server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json({extended:false}));

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
//user login and signup route
server.use(userRoutes);

server.use('/expense',expenseRoutes);
server.use('/purchase',purchaseRoutes);
server.use('/premium',premiumRoutes);
//creating association between user and expense
// A user can have many expenses but each expense will belong a single user
// So - one to many relationship

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

async function startServer (){
    try{
        await sequelize.sync();
        server.listen(3000);
    }catch(err){console.log(err);}
}
startServer();
