const Expense = require('../models/expense');

exports.getExpense = async (req,res) =>{
    try{
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    }
    catch(err){console.log(err);}

}
exports.addExpense = async (req,res) =>{
    try{
        const expense = await Expense.create({...req.body});
        res.status(201).json(expense);
    }
    catch(err){console.log(err);}
}
exports.editExpense = async (req,res) =>{
    const expenseId = req.params.id;
    try{
        const expense = await Expense.findByPk(expenseId);
        res.json(expense);
    }
    catch(err){console.log(err);}

}
exports.deleteExpense = async (req,res) =>{
    const expenseId = req.params.id;
    try{
        const expense = await Expense.findByPk(expenseId);
        await expense.destroy();
        res.sendStatus(200);
    }
    catch(err){console.log(err);}
}