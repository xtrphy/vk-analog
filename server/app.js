require('dotenv').config();
const express = require('express');
const session = require('express-session');
const prisma = require('./prisma/client');
const PrismaSessionStore = require('./utils/PrismaSessionStore');
require('./auth/github');
const sessionStore = new PrismaSessionStore();
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(
    session({
        name: 'sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.NODE_ENV === 'production' ? undefined : undefined
        }
    })
);

app.use(express.json());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const feedRouter = require('./routes/feed');
const getUserProfile = require('./controllers/userPageController');
const friendsRouter = require('./routes/friends');
const toggleSubscribeRouter = require('./routes/toggleSubscribe');
const likesRouter = require('./routes/likes');
const commentsRouter = require('./routes/comments');
const postRouter = require('./routes/post');

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/feed', feedRouter);
app.get('/user/:id', getUserProfile);
app.use('/friends', friendsRouter);
app.use('/subscribe', toggleSubscribeRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);
app.use('/post', postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));