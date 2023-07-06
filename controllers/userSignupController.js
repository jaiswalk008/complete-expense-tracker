const User = require('../models/user');

exports.addUser = async (req,res) =>{
    try{
        const user = await User.create({...req.body});
    }
    catch(err){console.log(err)}
}