require('dotenv').config();
const express = require('express');
require('./auth/github');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const feedRouter = require('./routes/feed');
const getUserProfile = require('./controllers/userPageController');
const friendsRouter = require('./routes/friends');
const toggleSubscribeRouter = require('./routes/toggleSubscribe');
const likesRouter = require('./routes/likes');
const postRouter = require('./routes/post');

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/feed', feedRouter);
app.get('/user/:id', getUserProfile);
app.use('/friends', friendsRouter);
app.use('/subscribe', toggleSubscribeRouter);
app.use('/likes', likesRouter);
app.use('/post', postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));