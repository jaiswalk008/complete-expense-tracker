const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premium');
const authentication = require('../middleware/auth');
router.get('/leaderboard',authentication ,premiumController.showLeaderBoard);

router.get('/download',authentication,premiumController.getReport);
router.get('/downloadlogs',authentication,premiumController.getDownloads);
module.exports = router;