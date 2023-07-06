const userSignupController = require('../controllers/userSignupController');
const express = require('express')
const router = express.Router();

router.post('/',userSignupController.addUser);

module.exports = router;