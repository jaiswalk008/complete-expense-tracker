const User = require('../models/user');

exports.showLeaderBoard = async (req,res) =>{
    try{
        const leaderboardResults = await User.find().select('name totalExpense')
        .sort({ totalExpense: -1 });
        // console.log(leaderboardResults);
        res.json({'results':leaderboardResults});
    } 
    catch(err){console.log(err);}
}
