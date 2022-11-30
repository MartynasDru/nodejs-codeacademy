const tasksContainer = document.getElementById('tasks');

const BASE_ENDPOINT = 'http://localhost:3000';
const GET_TASKS_ENDPOINT = BASE_ENDPOINT + '/api/tasks';
const GET_FIRST_TASK_ENDPOINT = GET_TASKS_ENDPOINT + '/1';

fetch(GET_FIRST_TASK_ENDPOINT)
    .then((res) => res.json())
    .then((task) => {
        const firstTask = document.createElement('h1');
        firstTask.textContent = `Pirmas taskas eilėje yra ${task.title}`
        tasksContainer.appendChild(firstTask);
    });

fetch(GET_TASKS_ENDPOINT)
    .then((res) => res.json())
    .then((tasks) => {
        tasks.forEach((task) => {
            const card = document.createElement('div');
            const title = document.createElement('h2');
            title.textContent = task.title;

            title.style.color = task.isDone ? 'green' : 'red';

            card.appendChild(title);

            tasksContainer.appendChild(card);
        });
    });

