const cors = require('cors');
const mysql = require('mysql2/promise');

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

app.get('/students', async (req, res) => {
  const connection = await mysql.createConnection(mysqlConfig);

  const result = await connection.execute('SELECT * FROM students');
  const students = result[0];

  res.send(students);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
