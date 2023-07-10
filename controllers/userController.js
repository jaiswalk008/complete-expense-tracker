const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
function generateAccessToken(id){
  return jwt.sign({userId:id} , /*secret key = */ 'jdgbdffdf25df64v68f29s2f98sdf29dsv4f82v');
}
/* bcrypt is one way encryption
jwt is a two way encryption
we call accesstoken when the user has loggedin correctly and we send the token
We dont send the userId directly because through that anybody can then change the content of that user
iat - issuing time is also attached to the payload so that tokens can be different
 */
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
            res.status(200).json({success: true, message: 'Log in Success' ,token : generateAccessToken(user.id)});
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
  