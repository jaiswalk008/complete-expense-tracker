const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premium');
const authentication = require('../middleware/auth');
router.get('/leaderboard',premiumController.showLeaderBoard);

module.exports = router;