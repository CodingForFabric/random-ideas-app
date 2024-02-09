const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
connectDB();
const app = express();

//Satic Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//card middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the randomideas api' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
