const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('../auth/github');
require('dotenv').config();

const router = express.Router();

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
    res.send(`<a href="/auth/github">Login with GitHub</a>`);
});

router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173/feed');
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
});

module.exports = router;