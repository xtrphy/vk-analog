const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
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

    res.json(userPosts);
});


module.exports = router;