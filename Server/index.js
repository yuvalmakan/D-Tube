const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const videoRoutes = require('./routes/videoRoute');
const userRoutes = require('./routes/userRoute');

const PORT = process.env.PORT ?? 8000;

const dbURI = 'mongodb+srv://YuvalMakan:MgzRYSnJjvv2-Fd@yuval-cluster.8iycpce.mongodb.net/D-Tube?appName=Yuval-Cluster';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Listening on port:', PORT));
  })
  .catch((err) => console.log(err));

app.use(express.static('Public'));
app.use('/', videoRoutes);
app.use('/', userRoutes);