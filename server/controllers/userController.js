const prisma = require('../prisma/client');

const getSuggestedUsers = async (req, res) => {
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

        const suggestions = await prisma.user.findMany({
            where: {
                id: {
                    notIn: Array.from(connectedIds),
                },
            },
            take: 5,
            select: {
                id: true,
                username: true,
                profilePicture: true,
            },
        });

        res.json(suggestions);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSuggestedUsers;