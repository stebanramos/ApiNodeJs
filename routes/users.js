var express = require('express');
var router = express.Router();
// Load the MySQL pool connection
const pool = require('../data/config');

// Display all users
router.get('/FindAllUsers', function (request, response, next) {

  pool.query('SELECT * FROM users', (error, result) => {

    if (error) {
      response.send(error);
    } else {
      response.send({ status: 200, users: result });
    }
  });
});

// Display a single user by ID
router.get('/FindUser/:id', (request, response) => {

  const id = request.params.id;

  pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {

    if (error) {
      response.send(error);
    } else {
      response.send({ status: 200, users: result });
    }
  });

});

// Add a new user
router.post('/AddUser', (request, response) => {

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password;

  let requestBody = [first_name, last_name, email, username, password];

  pool.query('INSERT INTO users (first_name,last_name,email, username,password) VALUES(?,?,?,?,?)', requestBody, (error, result) => {

    if (error) {
      response.send(error);
    } else {
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }

  });

});

// Update an existing user
router.put('/UpdateUser/:id', (request, response) => {
  const id = request.params.id;

  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const email = request.body.email;

  let requestBody = [first_name, last_name, email, id];

  pool.query('UPDATE users SET first_name=?, last_name=?, email=? WHERE id = ?', requestBody, (error, result) => {
      
    if (error) {
      response.send(error);
    } else {
      response.send('User updated successfully.');
    }
      
  });
});

// Delete a user
router.delete('/DeleteUser/:id', (request, response) => {
  const id = request.params.id;

  pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
      
    if (error) {
      response.send(error);
    } else {
      response.send('User deleted.');
    }
      
  });
});

module.exports = router;
