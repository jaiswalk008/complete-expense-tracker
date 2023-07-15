const userControllers = require('../controllers/userController');
const express = require('express')
const router = express.Router();
// const authentication = require('../middleware/auth');
router.post('/signup',userControllers.addUser);

router.post('/login',userControllers.loginUser);

router.post('/password/forgotpassword',userControllers.forgotPassword);

router.get('/password/resetpassword/:uuid',userControllers.resetPassword);

router.post('/password/updatepassword',userControllers.updatePassword);

module.exports = router;