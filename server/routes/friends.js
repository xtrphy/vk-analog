const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const getSuggestedFriends = require('../controllers/friendsController');

router.get('/', isAuth, getSuggestedFriends);

module.exports = router;