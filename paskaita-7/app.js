const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const mongoDB = 'mongodb+srv://martynasdd:test@cluster0.puekgbq.mongodb.net/cars-portal?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB!'));

const PORT = 3000;

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const carModel = mongoose.model('car', carSchema);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});
const userModel = mongoose.model('user', userSchema);

app.get('/cars', async (req, res) => {
    const cars = await carModel.find();
    res.send(cars);
});

app.post('/cars', async (req, res) => {
    const { brand, model, year, price } = req.body;
    await carModel.create({ brand, model, year, price });
    const cars = await carModel.find();
    res.send(cars);
});

app.get('/users', async (req, res) => {
    const users = await userModel.find();
    res.send(users);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));