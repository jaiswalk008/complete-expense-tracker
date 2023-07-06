const userControllers = require('../controllers/userController');
const express = require('express')
const router = express.Router();

router.post('/signup',userControllers.addUser);

router.post('/login',userControllers.loginUser);

module.exports = router;