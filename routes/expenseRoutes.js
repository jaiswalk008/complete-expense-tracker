const expenseController = require('../controllers/expenseController');
const express = require('express');
const router = express.Router();
//route for getting the expenses
router.get('/getExpense',expenseController.getExpense);
//route for adding the expense
router.post('/addExpense',expenseController.addExpense);
//route for editing the expense
router.get('/editExpense/:id',expenseController.editExpense);
//route for deleting the expense
router.delete('/deleteExpense/:id',expenseController.deleteExpense);

module.exports = router;