const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const prisma = require('../prisma/client');

router.get('/:postId', isAuth, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        const likesCount = await prisma.like.count({
            where: { postId },
        });

        const userLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        res.json({
            count: likesCount,
            isLiked: userLike,
        });
    } catch (err) {
        console.error('Error fetching likes', err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.post('/:postId/toggle', isAuth, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });

            const newCount = await prisma.like.count({
                where: { postId },
            });

            res.json({
                action: 'unliked',
                count: newCount,
                isLiked: false,
            });
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            });

            const newCount = await prisma.like.count({
                where: { postId },
            });

            res.json({
                action: 'liked',
                count: newCount,
                isLiked: true,
            });
        }
    } catch (err) {
        console.error('Error toggling like', err);
        res.status(500).json({ message: 'Database error' });
    }
});

module.exports = router;