/* this is a middleware to check who is login and then changing the req body and passing the controll to expenseController */
const jwt  = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req,res,next) =>{
    try{
        const token = req.header('Authorization');
         
        const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('userId :' + result.userId);
        const user = await User.findByPk(result.userId);
        req.user = user;
        next();
    }
    catch(err){console.log(err)};
}
module.exports = authenticate;