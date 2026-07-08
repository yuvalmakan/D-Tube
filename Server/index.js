const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const videoRoutes = require('./routes/videoRoute');
const userRoutes = require('./routes/userRoute');

const PORT = process.env.PORT ?? 8000;

const dbURI = process.env.MONGODB_URI ?? "mongodb://YuvalMakan:MgzRYSnJjvv2-Fd@ac-zqf2pyv-shard-00-00.8iycpce.mongodb.net:27017,ac-zqf2pyv-shard-00-01.8iycpce.mongodb.net:27017,ac-zqf2pyv-shard-00-02.8iycpce.mongodb.net:27017/dtube?ssl=true&replicaSet=atlas-i5q08v-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Listening on port:', PORT));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(express.static('Public'));
app.use('/', videoRoutes);
app.use('/', userRoutes);