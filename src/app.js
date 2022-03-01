const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createPool({
  host: '34.136.35.120',
  user: 'inventario',
  password: 'inventario',
  database: 'inventario'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// all customers
app.get('/API/Users/FindAll', (req, res) => {
  const sql = 'SELECT * FROM users';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/API/Users/FindById/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/API/Users/AddUsers', (req, res) => {
  const sql = 'INSERT INTO users SET ?';

  const customerObj = {
    name: req.body.name,
    apellido: req.body.apellido,
    edad: req.body.edad,
    createAt: req.body.createAt,
    sexo: req.body.sexo,
    isProfesional: req.body.isProfesional
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('User created!');
  });
});

app.put('/API/Users/Update:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, edad, sexo, isProfesional } = req.body;
  const sql = `UPDATE users SET nombre = '${nombre}', apellido='${apellido}', edad='${edad}', sexo='${sexo}', isProfesional='${isProfesional}' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('User updated!');
  });
});

app.delete('/API/Users/Delete:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete user');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
