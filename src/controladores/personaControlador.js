const mysql = require('mysql');
const { personaSchema } = require('../modelos/personaModel.js');

// MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'node20_mysql'
});

//Agregar objetos persona a el contenedor
exports.addPersona = function (req, callback) {
    var objPersona = new personaSchema();
    objPersona.Nombre = req.body.Nombre;
    objPersona.Apellido = req.body.Apellido;
    objPersona.Edad = req.body.Edad;
    objPersona.Sexo = req.body.Sexo;
    objPersona.IsProfesional = req.body.IsProfesional;

    const sql = 'INSERT INTO users SET ?';
    connection.query(sql, objPersona, error => {
        if (error) throw error;
        res.send('User created!');

        if (error) callback({ estado: { codigo: 2, respuesta: error.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, persona: objPersona });
    });
};

//Actualizar
exports.updatePersona = function (req, callback) {

    const { id } = req.params;
    const { Nombre, Apellido, Edad, Sexo, IsProfesional } = req.body;
    const sql = `UPDATE users SET nombre = '${Nombre}', apellido='${Apellido}', edad='${Edad}', sexo='${Sexo}', IsProfesional='${IsProfesional}' WHERE id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('User updated!');

        if (err) callback({ estado: { codigo: 2, respuesta: error.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' } });
    });
};

//Eliminar
exports.deletePersona = function (req, callback) {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete user');

        if (error) callback({ estado: { codigo: 2, respuesta: error.message } });
            callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' } });
    });
};
//Buscar person apor id
exports.findByIdPersona = function (req, callback) {

    const { id } = req.params;
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
        if (error) callback({ estado: { codigo: 2, respuesta: error.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, persona: result });
    });

};
//Listar todas las personas del contenedor
exports.findByAllPersona = function (req, callback) {

    const sql = 'SELECT * FROM users';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not result');
        }

        if (error) callback({ estado: { codigo: 2, respuesta: error.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, persona: results });
    });

};

// Check connect
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
  });