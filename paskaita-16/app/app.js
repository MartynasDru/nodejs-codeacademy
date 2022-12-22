const cors = require('cors');
const mysql = require('mysql2');

const express = require('express');
const { connect } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'test123',
  database: 'Shop',
  port: 3306
};

const connection = mysql.createConnection(mysqlConfig);

//ENDPOINTS
app.get('/products', (req, res) => {
  connection.execute('SELECT * FROM Products', (err, result) => {
    res.send(result);
  });
});

app.post('/employees', (req, res) => {
  connection.execute('INSERT INTO Employees (name, salary) VALUES (?, ?)', [req.body.name, req.body.salary], (err, result) => {
    console.log(err);
    connection.execute('SELECT * FROM Employees', (err, result) => {
      res.send(result);
    });
  });
});

app.post('/products', (req, res) => {
  const { title, price, stock } = req.body;

  connection.execute(
    'INSERT INTO Products (title, price, stock) VALUES (?, ?, ?)', 
    [title, price, stock],
    (err, result) => {
      connection.execute('SELECT * FROM Products', (err, result) => {
        res.send(result);
      });
    }
  )
});

app.patch('/employees/:id', (req, res) => {
  const { name, salary } = req.body;
  connection.execute(
    'UPDATE Employees SET name=?, salary=? WHERE id=?', 
    [name, salary, req.params.id],
    (err, result) => {
      connection.execute('SELECT * FROM Employees', (err, result) => {
        res.send(result);
      })
    }
  )
});

app.patch('/products/:id', (req, res) => {
  const { title, price, stock } = req.body;
  connection.execute(
    'UPDATE Products SET title=?, price=?, stock=? WHERE id=?', 
    [title, price, stock, req.params.id],
    (err, result) => {
      connection.execute('SELECT * FROM Products', (err, result) => {
        res.send(result);
      })
    }
  )
});

app.delete('/products/:id', (req, res) => {
  connection.execute('DELETE FROM Products WHERE id=?', [req.params.id], (err, result) => {
    connection.execute('SELECT * FROM Products', (err, result) => {
      res.send(result);
    });
  });
});

app.get('/sales', (req, res) => {
  connection.execute(
    `
      SELECT Customers.id as customerId, Sales.id as saleId, name, amount as saleAmount
      FROM Sales 
      INNER JOIN Customers 
      ON Customers.id=Sales.customerId;
    `,
    (err, result) => {
      res.send(result);
    }
  );
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
