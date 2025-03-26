require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('node:path');

const authRouter = require('./routes/auth');
const haulsRouter = require('./routes/hauls');
const commentsRouter = require('./routes/comments');
const userRouter = require('./routes/user');
const { optionalAuth } = require('./auth/optionalAuth');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/api/hauls', optionalAuth, haulsRouter, commentsRouter);
app.use('/api/users', optionalAuth, userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port`, PORT);
});
