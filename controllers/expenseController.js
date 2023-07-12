const Expense = require('../models/expense');
const User = require('../models/user');

exports.getExpense = async (req,res) =>{
    
    try{
        const expenses = await req.user.getExpenses();
        console.log(req.user.premium)
        res.status(200).json({"expense":expenses , "premium":req.user.premium});
    }
    catch(err){console.log(err);}

}
exports.addExpense = async (req,res) =>{
    console.log(req.user);
    console.log(req.body);
    try{
        const expense = await req.user.createExpense(req.body);
        res.status(201).json(expense);
    }
    catch(err){console.log(err);}
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
    try{
        const expense = await req.user.getExpenses({where : {id:expenseId}});
        //console.log(expense[0]);
        await expense[0].destroy();
        res.sendStatus(200);
    }
    catch(err){console.log(err);}
}