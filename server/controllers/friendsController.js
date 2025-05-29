const prisma = require('../prisma/client');

const getSuggestedFriends = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                followers: true,
                following: true,
            },
        });

        const connectedIds = new Set([
            userId,
            ...user.following.map(u => u.id),
            ...user.followers.map(u => u.id),
        ]);

        const suggestedFriends = await prisma.user.findMany({
            where: {
                id: {
                    notIn: Array.from(connectedIds),
                },
            },
            take: 9,
            select: {
                id: true,
                username: true,
                profilePicture: true,
            },
        });

        res.json(suggestedFriends);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSuggestedFriends;