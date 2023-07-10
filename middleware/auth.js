/* this is a middleware to check who is login and then changing the req body and passing the controll to expenseController */
const jwt  = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req,res,next) =>{
    try{
        const token = req.header('Authorization');
        console.log(token)
        const result = jwt.verify(token, 'jdgbdffdf25df64v68f29s2f98sdf29dsv4f82v');
        console.log('userId :' + result.userId);
        const user = await User.findByPk(result.userId);
        req.user = user;
        next();
    }
    catch(err){console.log(err)};
}
module.exports = authenticate;