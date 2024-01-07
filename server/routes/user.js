const userControllers = require('../controllers/user');
const express = require('express')
const router = express.Router();
// const authentication = require('../middleware/auth');
router.post('/signup',userControllers.addUser);

router.post('/login',userControllers.loginUser);

router.post('/forgotpassword',userControllers.forgotPassword);

router.post('/updatepassword',userControllers.updatePassword);
router.get('/checkLink/:uuid',userControllers.checkLink);
module.exports = router;