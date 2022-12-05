const tasksContainer = document.getElementById('tasks');
const addTaskForm = document.getElementById('addTaskForm');
const taskTitleInput = document.getElementById('taskTitleInput');

const BASE_ENDPOINT = 'http://localhost:3000';
const TASKS_ENDPOINT = BASE_ENDPOINT + '/api/tasks';
const GET_FIRST_TASK_ENDPOINT = TASKS_ENDPOINT + '/1';

addTaskForm.addEventListener('submit', (event) => {
    // event.preventDefault();
    fetch(TASKS_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: taskTitleInput.value })
    });
});

fetch(GET_FIRST_TASK_ENDPOINT)
    .then((res) => res.json())
    .then((task) => {
        const firstTask = document.createElement('h1');
        firstTask.textContent = `Pirmas taskas eilėje yra ${task.title}`
        tasksContainer.appendChild(firstTask);
    });

fetch(TASKS_ENDPOINT)
    .then((res) => res.json())
    .then((tasks) => {
        tasks.forEach((task) => {
            const card = document.createElement('div');
            card.style.display = 'flex';
            card.style.alignItems = 'center';

            const title = document.createElement('h2');
            title.textContent = task.title;

            title.style.color = task.isDone ? 'green' : 'red';

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';

            completeButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...task, isDone: true })
                }).then((res) => res.json())
                .then((tasks) => {
                    window.location.reload();
                });
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click', () => {
                fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                    method: 'DELETE'
                }).then((res) => res.json())
                .then((tasks) => {
                    window.location.reload();
                });
            });

            card.appendChild(title);
            card.appendChild(completeButton);
            card.appendChild(deleteButton);

            tasksContainer.appendChild(card);
        });
    });

