const express = require('express');
const prisma = require('../prisma/client');
const isAuth = require('../middlewares/isAuth');

const multer = require('multer');
const cloudinary = require('../utils/cloudinary');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), isAuth, async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    let imageUrl = null;

    if (!content || !userId) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'posts',
            });
            imageUrl = result.secure_url;
        }

        const post = await prisma.post.create({
            data: {
                content,
                imageUrl,
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
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating post' });
    }
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