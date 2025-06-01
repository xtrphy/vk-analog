const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const prisma = require('../prisma/client');

router.get('/', isAuth, async (req, res) => {
    if (!req.isAuthenticated()) return;

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            posts: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    comments: true,
                    likes: true,
                    _count: {
                        select: {
                            likes: true,
                        },
                    },
                },
            },
            followers: {
                include: {
                    follower: true,
                },
            },
            following: {
                include: {
                    followee: true,
                },
            },
            likes: true,
        },
    });

    res.json(user);
});

router.patch('/edit', isAuth, async (req, res) => {
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