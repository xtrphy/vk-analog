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
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        res.redirect(`${clientUrl}/feed`);
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.sendStatus(200);
    });
});

module.exports = router;