const session = require('express-session');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class PrismaSessionStore extends session.Store {
    constructor() {
        super();
    }

    async get(sid, callback) {
        try {
            const sessionRecord = await prisma.session.findUnique({ where: { sid } });
            if (!sessionRecord) return callback(null, null);
            const data = JSON.parse(sessionRecord.data);
            callback(null, data);
        } catch (err) {
            callback(err);
        }
    }

    async set(sid, sessionData, callback) {
        try {
            const expiresAt = sessionData.cookie?.expires
                ? new Date(sessionData.cookie.expires)
                : new Date(Date.now() + 86400000);

            const data = JSON.stringify(sessionData);

            await prisma.session.upsert({
                where: { sid },
                update: { data, expiresAt },
                create: { sid, data, expiresAt },
            });

            callback(null);
        } catch (err) {
            callback(err);
        }
    }

    async destroy(sid, callback) {
        try {
            await prisma.session.delete({ where: { sid } });
            callback(null);
        } catch (err) {
            callback(err);
        }
    }
}

module.exports = PrismaSessionStore;
