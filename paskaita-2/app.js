const express = require('express');
const app = express();
const PORT = 3000;

const CARS = [
    { id: 1, brand: 'BMW', model: '3', year: '2010', color: 'white' },
    { id: 2, brand: 'Audi', model: 'A6', year: '2015', color: 'black' }
];

const USERS = [
    { id: 1, name: 'Petras', surname: 'Petraitis', email: 'test@test.com' },
    { id: 2, name: 'Antanas', surname: 'Antanaitis', email: 'test@test.com' },
    { id: 3, name: 'Martynas', surname: 'Druteika', email: 'test@test.com' },
];

app.get('/api/cars', (req, res) => {
    res.send(CARS);
});

app.get('/api/cars/:id', (req, res) => {
    const id = Number(req.params.id);

    const car = CARS.find((car) => car.id === id);

    if (!car) {
        res.status(400).send('Car was not found');
    }

    res.send(car);
});

app.get('/api/users', (req, res) => {
    res.send(USERS);
});

app.get('/api/users/:stringStart', (req, res) => {
    const stringStart = req.params.stringStart.toLowerCase();
    
    const filteredUsers = USERS.filter((user) => user.name.toLowerCase().indexOf(stringStart) === 0);
    res.send(filteredUsers);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));