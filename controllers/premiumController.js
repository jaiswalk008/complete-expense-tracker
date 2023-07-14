const User = require('../models/user');
const Expense = require('../models/expense');
const Sequelize = require('sequelize');
exports.showLeaderBoard = async (req,res) =>{
    try{
        const leaderboardResults = await User.findAll({
          attributes:['name','totalExpense'],
          order:[['totalExpense','DESC']]
        })
        res.json(leaderboardResults);
    } 
    catch(err){console.log(err);}
}