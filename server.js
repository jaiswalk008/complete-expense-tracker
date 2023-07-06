const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const sequelize = require('./utils/database');
const userSignupRoutes = require('./routes/userSignupRoutes');

server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json({extended:false}));

//signup route
server.use('/signup',userSignupRoutes)


async function startServer (){
    try{
        await sequelize.sync();
        server.listen(3000);
    }catch(err){console.log(err);}
}
startServer();
