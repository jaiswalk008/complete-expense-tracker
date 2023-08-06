 
const User = require('../models/user');
const sequelize = require('../utils/database');

exports.getExpense = async (req,res) =>{
    const page = +req.query.page || 1;
    const rows = +req.query.rows; 
   
    try{
        const expenses = await req.user.getExpenses({
            offset: (page - 1) * rows,
            limit: rows,
          });
        const count = await req.user.countExpenses();

        res.status(200).json({"expense":expenses , "premium":req.user.premium,
        pageData: {
            currentPage: page,
            hasNextPage: rows * page < count,
            nextPage: page+1,
            hasPreviousPage: page > 1,
            previousPage: page - 1
        }
        });
    }
    catch(err){console.log(err);}

}
exports.addExpense = async (req,res) =>{
    
    const t =await sequelize.transaction();
    try{
        let currTotal = parseInt(req.user.totalExpense);
        const expense = await req.user.createExpense({...req.body},{transaction:t});
        currTotal = currTotal + parseInt(expense.amount);
        await User.update(
            {totalExpense:currTotal},
            {where:{id:req.user.id},transaction:t}
        )
        //will only result changes in the database if it is committed
        await t.commit();
        
        res.status(201).json(expense);
    }
    catch(err){
        //rolls back the changes
        await t.rollback();
        console.log(err);
    }
}
exports.editExpense = async (req,res) =>{
    const expenseId = req.params.id;
    try{
        const expense = await req.user.getExpenses({where: {id:expenseId}});
        //console.log(expense)
        res.json(expense[0]);
    }
    catch(err){console.log(err);}

}
exports.deleteExpense = async (req,res) =>{
    const expenseId = req.params.id;
    const t =await sequelize.transaction();
    try{
        const expense = await req.user.getExpenses({where : {id:expenseId}});
        let currTotal = parseInt(req.user.totalExpense);
        
        //changing the user's total expenses
        currTotal-=expense[0].amount;
        await User.update(
            {totalExpense:currTotal},
            {where:{id:req.user.id},transaction:t}
        )
        //console.log(expense[0]);
        await expense[0].destroy({ transaction: t });
        await t.commit();
        res.sendStatus(200);
    }
    catch(err){
        await t.rollback();
        console.log(err);
    }
}