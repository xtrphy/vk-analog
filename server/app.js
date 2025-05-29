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

app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/feed', feedRouter);
app.get('/user/:id', getUserProfile);
app.use('/friends', friendsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));