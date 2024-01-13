require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
// const sequelize = require('./utils/database');
const path = require('path');
const mongoose = require('mongoose');

//importing routes
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
server.use(cors());

server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json({extended:false}));

server.use(userRoutes);
server.use(express.static(path.join(__dirname, "public")));


server.use('/expense',expenseRoutes);
server.use('/purchase',purchaseRoutes);
server.use('/premium',premiumRoutes);

// server.use((req,res)=>{
    
//     res.sendFile(path.join(__dirname,`public${req.url}`));
// })


async function startServer (){
    try{
       console.log('server running')
        await mongoose.connect(process.env.MONGODB_SRV);
        server.listen(process.env.PORT || 4000);
    }catch(err){console.log(err);}
}
startServer();
