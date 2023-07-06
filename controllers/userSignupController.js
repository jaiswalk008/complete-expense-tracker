const User = require('../models/user');

exports.addUser = async (req,res) =>{
    //getting the user details
    const userDetails = {...req.body};
    try{
        const user =await  User.findOne({ where: {email : userDetails.email}});
        //if user exist
        if(user){
            res.json({'userFound':true});
        }
        else {
            const user = await User.create(userDetails);
            res.json(user);
        }
    }
    catch(err){console.log(err)}
}