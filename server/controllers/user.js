const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sib = require('sib-api-v3-sdk');
const ResetPassword = require('../models/forgotPasswordRequests');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


exports.addUser = async (req,res) =>{
    //getting the user details
    const userDetails = {...req.body};
    // console.log(userDetails);
    try{
      const existingmail = await User.findOne({'email': userDetails.email});
      // console.log(existingmail);
        //if user exist
        if(existingmail){
            throw new Error("Email Already exist!!");
            // console.group('email exists')
        }
        else {
          //encrypting the password
            const saltRounds = 10;
            bcrypt.hash(userDetails.password,saltRounds, async (err,hash)=>{
              //we can use const user because const is blocked scope
              const user = new User({...userDetails, password:hash});
              await user.save();
              // console.log(user);
              res.json(user);
            })
            
        }
    }
    catch(err){
      console.log(err)
      res.status(403).json({message:err.message});
    }
}
function generateAccessToken(id,name){
  return jwt.sign({userId:id} , /*secret key = */ process.env.JWT_SECRET_KEY);
}
 
exports.loginUser = async (req, res) => {
    const userDetails = req.body;
    try {
      const user = await User.findOne({ email: userDetails.email });
      if (user) {
        //comparing password with hash value
        //first is normal password and the second is hash value
        bcrypt.compare(userDetails.password , user.password , async (err,result)=>{
          if(err){
            throw new Error('Something went wrong');
          }
          else if(result===true){
            res.status(200).json({success: true,premium:user.premium, message: 'Log in Success' ,token : generateAccessToken(user.id ), "username": user.name});
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
  // controller for sending email when the user enters email and wants to reset password
  exports.forgotPassword = async (req,res) =>{
    //getting a new uuid
    const uuid = uuidv4();
    
    const defaultClient = sib.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.EMAIL_API_KEY;

    const apiInstance = new sib.TransactionalEmailsApi();
    let sendSmtpEmail = new sib.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    const sender ={ name:'Expense Tracker',email: 'jaiskaran008@gmail.com'};
    sendSmtpEmail = {
        sender,
        to: [{
            email: req.body.email
        }], 
        subject : 'Password Reset',
        htmlContent: `<html><head></head><body><a  href="http://localhost:3000/resetpassword/${uuid}">Click to reset your password</a>`
    };
    
    try{
      let user = await User.findOne( { email : req.body.email });
      //if the user exist then only send the email
      if(user){
        
        user = {...user._doc};
        // console.log(user);
        try {
          // res.sendFile(path.join(__dirname,'..','views','mailSent.html'));
          const resetPassword = new  ResetPassword({ id: uuid, userId: user._id });
          await resetPassword.save();
          const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
          res.json({message:'sent mail successfully'});
          
        } catch (error) {
          res.status(400).json({'message':'something went wrong'});
        }
      }else res.status(400).json({"message":"user not found"});
    
    }catch(err){res.status(400).json(err)}

  }
  //controller which recieves the request when the user clicks on the reset
  //password email link
  // exports.resetPassword =async (req,res) =>{
  //   const uuid = req.params.uuid;
   
  //   const result = await ResetPassword.findOne({id:uuid});

  //   if(result && result.isActive){
  //     res.sendFile(path.join(__dirname,'..','public','user','resetPassword.html'));
      
  //   }
      
      
  //   else{
  //     const htmlContent = `<html><head></head><body><h1>This Link has already been used.</h1><a href="http://localhost:3000/user/passwordRecovery.html">Click here to reset password</body></html>`;
      
  //     res.send(htmlContent);    
  //   }
  // }
  //controller for updating the password
  
  exports.checkLink = async (req,res) =>{
    const uuid = req.params.uuid;
    ;
    try{
      const result = await ResetPassword.findOne({id:uuid});
     
      
      if(result && result.isActive){
        res.json({message:'link valid'});
      }
      else{
        res.json({message:'link used'});
      }
    }
    catch(err) {console.log(err)}
  }
  
  exports.updatePassword = async (req,res)=>{
    const password = req.body.password;
    console.log(password);
    const saltRounds = 10;
    const result  = await ResetPassword.find({id:req.body.uuid});
    // console.log(result);
    // const user = await User.find({_id:result.userId});
    
    bcrypt.hash(password,saltRounds, async (err,hash)=>{
      if(err){
        console.log(err);
      }
      try {
        console.log(result[0]);
        await User.findByIdAndUpdate({_id:result[0].userId},{password:hash})
        await ResetPassword.updateOne({id:req.body.uuid},{isActive:false});
        
        console.log('password updated');
        res.json({message:'password updated'});
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error occurred while updating the password.' });
      }
    }) 
  }