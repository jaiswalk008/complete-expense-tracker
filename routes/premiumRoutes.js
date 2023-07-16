const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premiumController');
const authentication = require('../middleware/auth');
router.get('/leaderboard',premiumController.showLeaderBoard);

router.get('/download',authentication,premiumController.getReport);
module.exports = router;