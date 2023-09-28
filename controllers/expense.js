
const User = require('../models/user');
const mongoose = require('mongoose');
const Expense = require('../models/expense');

exports.getExpense = async (req,res) =>{
    const page = +req.query.page || 1;
    const rows = +req.query.rows; 
    
    try{
        
        const expenses = await Expense.find({ userId:req.user })
            .skip((page - 1) * rows)
            .limit(rows);
        // console.log(expenses);
        const count = await Expense.count({ userId:req.user });
        
        // console.log(count);
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
exports.addExpense = async (req, res) => {
    //starting a session
    const session = await mongoose.startSession();
    session.startTransaction();

    // console.log(req.body);
    try {
        const user = await User.findOne({_id:req.user[0]._id});
        let currTotal = parseInt(user.totalExpense);

        const expense = new Expense({...req.body , userId:req.user[0]._id},{session});
        //console.log(expense)
        
        
        // Update the user's totalExpense
        currTotal = currTotal + parseInt(expense.amount);
       
        await User.findByIdAndUpdate({_id: req.user[0]._id}, { totalExpense: currTotal }, { session });
        await expense.save();
        // Commit the transaction
        await session.commitTransaction();

        res.status(201).json(expense);
    } catch (err) {
        // If an error occurs, abort the transaction
        await session.abortTransaction();
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // End the session
        session.endSession();
    }
};

exports.editExpense = async (req,res) =>{
    const expenseId = req.params.id;
    try{
        const expense = await Expense.findOne({_id:expenseId});
        console.log(expense)
        res.json(expense);
    }
    catch(err){console.log(err);}

}
exports.deleteExpense = async (req,res) =>{
    const expenseId = req.params.id;
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const expense = await Expense.findOne( {_id:expenseId});
        const user = await User.findOne({_id:req.user[0]._id});
        let currTotal = parseInt(user.totalExpense);
        
        //changing the user's total expenses
        currTotal-=expense.amount;
        await User.findByIdAndUpdate({_id: req.user[0]._id}, { totalExpense: currTotal }, { session });
        //console.log(expense[0]);
        await Expense.findByIdAndDelete( {_id:expenseId});
        await session.commitTransaction();        
        res.sendStatus(200);
    }
    catch(err){
        await session.abortTransaction();
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }finally {
        // End the session
        session.endSession();
    }
}