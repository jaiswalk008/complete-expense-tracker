const expenseController = require('../controllers/expense');
const express = require('express');
const router = express.Router();
const userAuthentication  = require('../middleware/auth');

//route for getting the expenses
router.get('/getExpense',userAuthentication,expenseController.getExpense);
//route for adding the expense
router.post('/addExpense',userAuthentication,expenseController.addExpense);
//route for editing the expense
router.put('/editExpense/:id',userAuthentication,expenseController.editExpense);
// //route for deleting the expense
router.delete('/deleteExpense/:id',userAuthentication,expenseController.deleteExpense);

module.exports = router;