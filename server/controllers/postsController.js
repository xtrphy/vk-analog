const prisma = require('../prisma/client');

const getFeedPosts = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                following: {
                    select: {
                        followee: {
                            select: { id: true },
                        },
                    },
                },
            },
        });

        const followedUserIds = user.following.map(f => f.followee.id);

        const feedPosts = await prisma.post.findMany({
            where: {
                authorId: {
                    in: [...followedUserIds, userId],
                },
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
            take: 30,
        });

        const postsWithLikeStatus = feedPosts.map(post => ({
            ...post,
            isLiked: post.likes.length > 0,
            likes: undefined,
        }));

        res.json(postsWithLikeStatus);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed loading posts' });
    }
};

module.exports = getFeedPosts;