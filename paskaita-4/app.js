const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let TASKS = [
    { id: 1, title: 'Išplauti indus', isDone: false },
    { id: 2, title: 'Išsiurbti namus', isDone: true },
    { id: 3, title: 'Pasimokyti programuoti', isDone: false },
    { id: 4, title: 'Pavedžioti šunį', isDone: false },
];

app.get('/api/tasks', (req, res) => {
    res.send(TASKS);
});

app.get('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = TASKS.find((task) => task.id === id);
    res.send(task);
});

app.post('/api/tasks', (req, res) => {
    const lastTask = TASKS[TASKS.length - 1];
    const newTask = { ...req.body, id: lastTask.id + 1, isDone: false };

    TASKS.push(newTask);
    res.send(TASKS);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const newTask = req.body;

    const updatedTasks = TASKS.map((task) => {
        if (task.id === id) {
            return {
                ...newTask,
                id: task.id
            };
        }
        return task;
    });

    TASKS = [...updatedTasks];
    res.send(TASKS);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));