const User = require('../models/user');
const Expense = require('../models/expense');
const Sequelize = require('sequelize');
exports.showLeaderBoard = async (req,res) =>{
    try{
        const leaderboardResults = await User.findAll({
          attributes:['id','name',[Sequelize.fn('SUM', Sequelize.col('amount')), 'total']],
          include :[
           { model:Expense,attributes:[]}
          ],
          group: ['user.id'],
          order:[['total','DESC']]
        })
        res.json(leaderboardResults);
    } 
    catch(err){console.log(err);}
}