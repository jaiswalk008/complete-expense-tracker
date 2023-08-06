require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const sequelize = require('./utils/database');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const https = require('https');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premiumRoutes');
const morgan = require('morgan');
const compression = require('compression');
server.use(cors());
 


server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json({extended:false}));

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ResetPassword = require('./models/forgotPasswordRequests')
const DownloadLogs = require('./models/downloadLogs');
const { Stream } = require('stream');
//user login and signup route
server.use(userRoutes);
server.use(express.static(path.join(__dirname, "public")));


server.use('/expense',expenseRoutes);
server.use('/purchase',purchaseRoutes);
server.use('/premium',premiumRoutes);
//setting default route
server.use((req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname,`views/${req.url}`));
})
//creating association between user and expense


User.hasMany(Expense);
Expense.belongsTo(User);

//creating association between user and order
User.hasMany(Order);
Order.belongsTo(User);

//creating association between user and reset password
User.hasMany(ResetPassword);
ResetPassword.belongsTo(User);

//creating association between user and download logs
User.hasMany(DownloadLogs);
DownloadLogs.belongsTo(User);

async function startServer (){
    try{
        await sequelize.sync();
        server.listen(process.env.PORT || 3000);
    }catch(err){console.log(err);}
}
startServer();
