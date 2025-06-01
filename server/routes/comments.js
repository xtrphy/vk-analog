const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const prisma = require('../prisma/client');

router.get('/:postId', isAuth, async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await prisma.comment.findMany({
            where: { postId },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        profilePicture: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json(comments);
    } catch (err) {
        console.error('Error fetching comments', err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.post('/:postId', isAuth, async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                authorId: userId,
                postId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        profilePicture: true,
                    },
                },
            },
        });

        res.json({ comment });
    } catch (err) {
        console.error('Error creating comment', err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.delete('/:commentId', isAuth, async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            select: {
                id: true,
                authorId: true,
                postId: true,
            },
        });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.authorId !== userId) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }

        const deletedComment = await prisma.comment.delete({
            where: { id: commentId },
            select: {
                id: true,
                postId: true,
            },
        });

        res.json({ message: 'Comment deleted successfully', deletedComment });

    } catch (err) {
        console.error('Error deleting comment', err);
        res.status(500).json({ message: 'Failed to delete comment' });
    }
});

module.exports = router;