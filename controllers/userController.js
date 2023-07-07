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
exports.loginUser = async (req, res) => {
    const userDetails = req.body;
    try {
      const user = await User.findOne({ where: { email: userDetails.email } });
      if (user) {
        if (user.password === userDetails.password) {
          res.status(200).json({success: true, message: 'Log in Success'});
        } else {
          res.status(401).json({success: false, message: 'password incorrect!!'});
        }
      }
      else {
        res.status(404).json({success: false, message: 'user not found!!'});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error!' });
    }
  };
  