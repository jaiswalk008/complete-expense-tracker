const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premiumController');

router.get('/leaderboard',premiumController.showLeaderBoard);

module.exports = router;