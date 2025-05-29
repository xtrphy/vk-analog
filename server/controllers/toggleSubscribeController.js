const prisma = require('../prisma/client');

const toggleSubscribe = async (req, res) => {
    const userId = req.user.id;
    const { targetUserId } = req.body;

    if (userId === targetUserId) {
        return res.status(400).json({ message: 'You can\'t follow yourself' });
    }

    try {
        const followee = await prisma.user.findUnique({
            where: { id: targetUserId },
        });

        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followeeId: {
                    followerId: userId,
                    followeeId: targetUserId,
                },
            },
        });

        if (existingFollow) {
            await prisma.follow.delete({
                where: {
                    followerId_followeeId: {
                        followerId: userId,
                        followeeId: targetUserId,
                    },
                },
            });

            return res.status(200).json({ message: 'Unsubscribed', followee });
        } else {
            await prisma.follow.create({
                data: {
                    followerId: userId,
                    followeeId: targetUserId,
                },
            });

            return res.status(200).json({ message: 'Subscribed', followee });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = toggleSubscribe;