const User = require('../models/user');
const Expense = require('../models/expense');
const Sequelize = require('sequelize');
exports.showLeaderBoard = async (req,res) =>{
    try{
        const results = await Expense.findAll({
            attributes: [
              'userId',
              [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
            ],
            group: 'userId',
            order: [['total', 'DESC']]
          });
        const values = results.map(result => result.dataValues);
       
        const leaderboardResults  = values.map( async (element) => {
            
            const response = await User.findByPk(element.userId, { attributes: ['name'] });            
            element['name']  =response.dataValues.name; 
            return element;
        });
        Promise.all(leaderboardResults).then((result) => {
                res.status(202).json(result);
          }).catch(err => console.log(err))
    } 
    catch(err){console.log(err);}
}