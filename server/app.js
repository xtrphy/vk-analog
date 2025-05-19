require('dotenv').config();
const express = require('express');
require('./auth/github');
const cors = require('cors');

const app = express();

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

app.use('/', authRouter);
app.use('/profile', profileRouter);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));