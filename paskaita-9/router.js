const carModel = require('./models/car');
const userModel = require('./models/user');
const advertModel = require('./models/advert');

const express = require('express');
const router = express.Router();

router.get('/cars', async (req, res) => {
    const cars = await carModel.find().sort({ year: 1 });
    res.send(cars);
});

router.get('/cars/:brand', async  (req, res) => {
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

router.post('/cars', async (req, res) => {
    const { brand, model, year, price } = req.body;
    await carModel.create({ brand, model, year, price });
    const cars = await carModel.find();
    res.send(cars);
});

router.get('/users', async (req, res) => {
    const { sort } = req.query;

    let users = await userModel.find();
    
    if (sort === 'asc') {
        users = await userModel.find().sort({ surname: 1 });
    } else if (sort === 'desc') {
        users = await userModel.find().sort({ surname: -1 });
    }
    
    res.send(users);
});

// app.get('/users/asc', async (req, res) => {
//     const users = await userModel.find().sort({ surname: 1 });
//     res.send(users);
// });

// app.get('/users/desc', async (req, res) => {
//     const users = await userModel.find().sort({ surname: -1 });
//     res.send(users);
// });

router.get('/users/:name', async (req, res) => {
    const { name } = req.params;
    const users = await userModel.find(
        { 
            name: { 
                $regex: `^${name}$`,
                $options: 'i'
            } 
        }
    );
    res.send(users);
});

router.post('/users', async (req, res) => {
    const { name, surname, role } = req.body;
    await userModel.create({ name, surname, role });
    const users = await userModel.find();
    res.send(users);
});

router.post('/adverts', async (req, res) => {
    const { brand, model, price } = req.body;
    await advertModel.create({ brand, model, price });
    const adverts = await advertModel.find();
    res.send(adverts);
});

module.exports = router;