const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
    res.json(req.user);
});

router.patch('/edit', async (req, res) => {
    const { bio, profilePicture } = req.body;
    const userId = req.user.id;

    const updateData = {};
    if (bio !== undefined) updateData.bio = bio;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No data to update' });
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        res.json({ message: 'Profile updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

module.exports = router;