const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const toggleSubscribeController = require('../controllers/toggleSubscribeController');

router.post('/', isAuth, toggleSubscribeController);

module.exports = router;