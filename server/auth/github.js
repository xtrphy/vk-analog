const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const prisma = require('../prisma/client');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new GitHubStrategy(
    {
        clientID: process.env.GH_CLIENT_ID,
        clientSecret: process.env.GH_CLIENT_SECRET,
        callbackURL: process.env.GH_CALLBACK_URL || "https://vk-analog.onrender.com/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const githubId = profile.id;

            let user = await prisma.user.findUnique({
                where: { githubId },
            });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        githubId: profile.id,
                        username: profile.username,
                        email: profile.emails?.[0]?.value || null,
                        profilePicture: profile.photos?.[0]?.value || null,
                        bio: profile.bio,
                    },
                });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));
