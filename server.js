const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const sequelize = require('./utils/database');
const userRoutes = require('./routes/userRoutes');

server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json({extended:false}));

//user login and signup route
server.use(userRoutes);


async function startServer (){
    try{
        await sequelize.sync();
        server.listen(3000);
    }catch(err){console.log(err);}
}
startServer();
