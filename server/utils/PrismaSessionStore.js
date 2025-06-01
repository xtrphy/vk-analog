const { PrismaClient } = require('@prisma/client');

function PrismaSessionStore(prisma) {
    return {
        async get(sid, callback) {
            try {
                const session = await prisma.session.findUnique({ where: { sid } });
                if (!session || new Date() > session.expiresAt) return callback(null, null);
                callback(null, JSON.parse(session.data));
            } catch (err) {
                callback(err);
            }
        },

        async set(sid, sessionData, callback) {
            try {
                const expiresAt = sessionData.cookie?.expires
                    ? new Date(sessionData.cookie.expires)
                    : new Date(Date.now() + 86400000);

                const data = JSON.stringify(sessionData);

                await prisma.session.upsert({
                    where: { sid },
                    update: { data, expiresAt },
                    create: { sid, data, expiresAt }
                });

                callback(null);
            } catch (err) {
                callback(err);
            }
        },

        async destroy(sid, callback) {
            try {
                await prisma.session.delete({ where: { sid } });
                callback(null);
            } catch (err) {
                callback(null);
            }
        },

        async length(callback) {
            try {
                const count = await prisma.session.count();
                callback(null, count);
            } catch (err) {
                callback(err);
            }
        },

        async all(callback) {
            try {
                const sessions = await prisma.session.findMany();
                callback(null, sessions.map(sess => JSON.parse(sess.data)));
            } catch (err) {
                callback(err);
            }
        },

        async clear(callback) {
            try {
                await prisma.session.deleteMany();
                callback(null);
            } catch (err) {
                callback(err);
            }
        },

        async touch(sid, sessionData, callback) {
            try {
                const expiresAt = sessionData.cookie?.expires
                    ? new Date(sessionData.cookie.expires)
                    : new Date(Date.now() + 86400000);

                await prisma.session.update({
                    where: { sid },
                    data: { expiresAt },
                });

                callback(null);
            } catch (err) {
                callback(err);
            }
        }
    };
}


module.exports = PrismaSessionStore;
