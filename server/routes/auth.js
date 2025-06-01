const express = require('express');
const session = require('express-session');
const passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
require('dotenv').config();
require('../auth/github');

const router = express.Router();

const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

router.use(session({
    store: new pgSession({
        pool: pgPool,
        tableName: 'session',
    }),
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect(process.env.CLIENT_URL || 'http://localhost:5173/feed');
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.sendStatus(200);
    });
});

module.exports = router;