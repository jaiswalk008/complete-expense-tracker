const User = require('../models/user');
const client = require('../utils/client');
exports.showLeaderBoard = async (req,res) =>{
    try{
        const result = await client.get('leaderboardResults');
        console.log(result);
        
        if(result) return res.json({'results':JSON.parse(result)});
        const leaderboardResults = await User.find().select('name totalExpense')
        .sort({ totalExpense: -1 });
        // console.log(leaderboardResults);
         await client.set('leaderboardResults',JSON.stringify(leaderboardResults));
        
        res.json({'results':leaderboardResults});
    } 
    catch(err){console.log(err);}
}
