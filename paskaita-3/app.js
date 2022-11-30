const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const TASKS = [
    { id: 1, title: 'Išplauti indus', isDone: false },
    { id: 2, title: 'Išsiurbti namus', isDone: true },
    { id: 3, title: 'Pasimokyti programuoti', isDone: false },
    { id: 4, title: 'Pavedžioti šunį', isDone: false },
];

app.get('/api/tasks', (req, res) => {
    res.send(TASKS);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));