const express = require('express');
const prisma = require('../prisma/client');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

router.post('/', isAuth, async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || !userId) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    const post = await prisma.post.create({
        data: {
            content,
            authorId: userId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    profilePicture: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                    comments: true,
                },
            },
            likes: {
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                },
            },
            comments: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
                select: {
                    content: true,
                    createdAt: true,
                    author: {
                        select: {
                            id: true,
                            username: true,
                            profilePicture: true,
                        },
                    },
                },
            },
        },
    });

    res.json(post);
});

router.get('/', isAuth, async (req, res) => {
    const userId = req.user.id;

    try {
        const userPosts = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        profilePicture: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
                likes: {
                    where: {
                        userId: userId,
                    },
                    select: {
                        id: true,
                    },
                },
                comments: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                                profilePicture: true,
                            },
                        },
                    },
                },
            },
        });

        res.json(userPosts);

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts' });
        console.error('Error fetching posts', err);
    }
});

router.delete('/:postId', isAuth, async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: {
                id: true,
                authorId: true,
            },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.authorId !== userId) {
            return res.status(403).json({ message: 'You can only delete your own posts' });
        }

        const deletedPost = await prisma.post.delete({
            where: { id: postId },
            select: {
                id: true,
            }
        });

        res.json({ message: 'Post deleted successfully', deletedPost });
    } catch (err) {
        console.error('Error deleting post', err);
        res.status(500).json({ message: 'Failed to delete post' });
    }
});

module.exports = router;