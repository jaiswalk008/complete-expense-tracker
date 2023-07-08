const User = require('../models/user');
const bcrypt = require('bcryptjs');
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
          //encrypting the password
            const saltRounds = 10;
            bcrypt.hash(userDetails.password,saltRounds, async (err,hash)=>{
              //we can use const user because const is blocked scope
              const user = await User.create({...userDetails,password:hash});
              res.json(user);
            })
            
        }
    }
    catch(err){console.log(err)}
}
exports.loginUser = async (req, res) => {
    const userDetails = req.body;
    try {
      const user = await User.findOne({ where: { email: userDetails.email } });
      if (user) {
        //comparing password with hash value
        //first is normal password and the second is hash value
        bcrypt.compare(userDetails.password , user.password , async (err,result)=>{
          if(err){
            throw new Error('Something went wrong');
          }
          else if(result===true){
            res.status(200).json({success: true, message: 'Log in Success'});
          }
          else {
            res.status(401).json({success: false, message: 'password incorrect!!'});
          }
        })
        
      }
      else {
        res.status(404).json({success: false, message: 'user not found!!'});
      }
    } catch (err) {
      
      res.status(500).json({ message: 'Internal server error!' });
    }
  };
  