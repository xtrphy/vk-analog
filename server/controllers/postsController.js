const prisma = require('../prisma/client');

const getFeedPosts = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                following: {
                    where: {
                        status: 'ACCEPTED',
                    },
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
            },
            take: 30,
        });

        res.json(feedPosts);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed loading posts' });
    }
};

module.exports = getFeedPosts;