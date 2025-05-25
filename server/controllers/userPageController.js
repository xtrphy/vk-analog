const prisma = require('../prisma/client');

const getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                profilePicture: true,
                bio: true,
                followers: {
                    select: { id: true },
                },
                following: {
                    select: { id: true },
                },
                posts: {
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            ...user,
            followersCount: user.followers.length,
            followingCount: user.following.length,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error loading profile' });
    }
};

module.exports = getUserProfile;