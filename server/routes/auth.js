const express = require('express');
const passport = require('passport');
require('dotenv').config();
require('../auth/github');

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('https://vkonnekte-app.netlify.app/feed');
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.sendStatus(200);
    });
});

module.exports = router;