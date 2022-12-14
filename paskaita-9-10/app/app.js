const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');
const app = express();
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(router);

const mongoDB = 'mongodb+srv://martynasdd:test@cluster0.puekgbq.mongodb.net/cars-portal?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB!'));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));