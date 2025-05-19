const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.send(`<h1>Hello ${req.user.username}</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
});

module.exports = router;