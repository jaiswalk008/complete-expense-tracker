const membershipRoutes = require('../controllers/purchase');
const userAuthentication = require('../middleware/auth')
const express = require('express')
const router = express.Router();

router.get('/premiummembership',userAuthentication , membershipRoutes.purchasePremium);

router.post('/updatetransactionstatus',userAuthentication, membershipRoutes.updateTransaction);

module.exports = router;