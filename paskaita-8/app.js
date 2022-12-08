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

const defaultSchemaValue = {
    required: true,
}

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        lowercase: true,
        ...defaultSchemaValue
    },
    model: {
        type: String,
        ...defaultSchemaValue
    },
    year: {
        type: Number,
        ...defaultSchemaValue
    },
    price: {
        type: Number,
        ...defaultSchemaValue
    }
});
const carModel = mongoose.model('car', carSchema);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        ...defaultSchemaValue
    },
    surname: {
        type: String,
        ...defaultSchemaValue
    },
    role: {
        type: String,
        ...defaultSchemaValue
    }
});
const userModel = mongoose.model('user', userSchema);

app.get('/cars', async (req, res) => {
    const cars = await carModel.find();
    res.send(cars);
});

app.get('/cars/:brand', async  (req, res) => {
    const brand = req.params.brand.toLowerCase();
    // const cars = await carModel.find(
    //     { 
    //         brand: { 
    //             $regex: new RegExp(brand, 'i') 
    //         } 
    //     }
    // );
    const cars = await carModel.find({ brand });
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

app.get('/users/:name', async (req, res) => {
    const { name } = req.params;
    const users = await userModel.find(
        { 
            name: { 
                $regex: new RegExp(name, 'i') 
            } 
        }
    );
    res.send(users);
});

app.post('/users', async (req, res) => {
    const { name, surname, role } = req.body;
    await userModel.create({ name, surname, role });
    const users = await userModel.find();
    res.send(users);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));