const express = require('express');
const router = express.Router();
const getSuggestedUsers = require('../controllers/userController');
const getFeedPosts = require('../controllers/postsController');
const isAuth = require('../middlewares/isAuth');

router.get('/suggested-users', isAuth, getSuggestedUsers);

router.get('/posts', isAuth, getFeedPosts);

module.exports = router;