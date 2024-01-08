
const User = require('../models/user');
const mongoose = require('mongoose');
const Expense = require('../models/expense');
const client = require('../utils/client');
exports.getExpense = async (req,res) =>{

    try{
        
        const expenseData = await client.hget(`expenses:${req.user[0]._id}`,'expenses')
        await client.zadd('expenseRanking' , +req.user[0].totalExpense , req.user[0]._id.toString());
        // console.log(expenseData);
        if(expenseData) return res.json({"expense":JSON.parse(expenseData) ,"premium":req.user[0].premium})
        // console.log(count);
        // console.log(req.user[0].premium);
        const expenses = await Expense.find({ userId:req.user })
        await client.hset(`expenses:${req.user[0]._id}`,{'expenses':JSON.stringify(expenses) })
        res.status(200).json({"expense":expenses , "premium":req.user[0].premium,});
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
        
        // Update the user's totalExpense
        currTotal = currTotal + parseInt(expense.amount);
        
        await User.findByIdAndUpdate({_id: req.user[0]._id},
            { totalExpense: currTotal }, { session });
        const multi = client.multi();
        multi.hdel(`expenses:${req.user[0]._id}`,'expenses');
        // multi.zadd('expenseRanking' , currTotal  , req.user[0]._id.toString());
        multi.del('leaderboardResults');
        multi.exec((err, replies) => {
            if (err) {
                console.error('Transaction failed:', err);
                return;
            } else {
                console.log('Transaction succeeded. Replies:', replies);
            }
            
        });

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
    const expenseDetails = req.body;
   
    try{
        // const expense = await Expense.findOne( {_id:expenseId});
        await Expense.updateOne({_id:expenseId},expenseDetails);
        const result = await client.hget(`expenses:${req.user[0]._id}`,'expenses');
        const expenseData = JSON.parse(result);
        // if(expense.amount!=expenseDetails.amount){
        //     const currTotal = req.user[0].totalExpense - expense.amount + +expenseDetails.amount;
        //     console.log(currTotal);
        //     await client.zadd('expenseRanking' , +currTotal , req.user[0]._id.toString());

        // }
        expenseData.forEach((expense) =>{
            if(expense._id.toString()===expenseId.toString()){
                console.log('expense found');
                expense.expenseName=expenseDetails.expenseName;
                expense.amount=expenseDetails.amount;
                expense.category=expenseDetails.category;
                expense.description=expenseDetails.description;
            }
        })
        await client.del('leaderboardResults');
        await client.hset(`expenses:${req.user[0]._id}`,{'expenses':JSON.stringify(expenseData) })
        
        res.json({message:'edit successful'});
    }
    catch(err){console.log(err);}

}
exports.deleteExpense = async (req,res) =>{
    const expenseId = req.params.id;
    const session = await mongoose.startSession();
    session.startTransaction();
    let currTotal = req.query.total;
    
    try{
        const expense = await Expense.findOne( {_id:expenseId});
        const multi = client.multi();
        const result = await client.hget(`expenses:${req.user[0]._id}`,'expenses');
        const expenseData = JSON.parse(result).filter(expense => expense._id.toString()!== expenseId);
        multi.hset(`expenses:${req.user[0]._id}`,{'expenses':JSON.stringify(expenseData) })
        currTotal-=expense.amount;
        // multi.zadd('expenseRanking' , +currTotal , req.user[0]._id.toString());
        multi.del('leaderboardResults');

        multi.exec((err, replies) => {
            if (err) {
                console.error('Transaction failed:', err);
                return;
            } else {
                console.log('Transaction succeeded. Replies:', replies);
            }
            
        });
        
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