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
server.use(helmet());
server.use(compression());

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags: 'a'}
);

server.use(morgan('combined' , {stream : accessLogStream}));
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json({extended:false}));
require('dotenv').config();
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ResetPassword = require('./models/forgotPasswordRequests')
const DownloadLogs = require('./models/downloadLogs');
const { Stream } = require('stream');
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

User.hasMany(ResetPassword);
ResetPassword.belongsTo(User);

User.hasMany(DownloadLogs);
DownloadLogs.belongsTo(User);

async function startServer (){
    try{
        await sequelize.sync();
        server.listen(process.env.PORT || 3000);
    }catch(err){console.log(err);}
}
startServer();
