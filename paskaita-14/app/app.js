const cors = require('cors');
const mysql = require('mysql2');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'test123',
  database: 'codeacademy',
  port: 3306
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/students', (req, res) => {
  connection.execute('SELECT * FROM students', (err, students) => {
    res.send(students);
  });
});

app.get('/assignments', async (req, res) => {
  connection.execute('SELECT * FROM assignments', (err, assignments) => {
    res.send(assignments);
  });
});

app.get('/assignments/done', async (req, res) => {
  connection.execute('SELECT * FROM assignments WHERE done=1', (err, doneAssignments) => {
    res.send(doneAssignments);
  });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
