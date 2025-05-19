const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
    res.json(req.user);
});

module.exports = router;