var mongoose = require('mongoose');
require('../modelos/personaModel.js');

var PersonaModel = mongoose.model('Persona');

//Agregar objetos persona a el contenedor
exports.addPersona = function (req, callback) {
    var objPersona = new PersonaModel();
    objPersona.Nombre = req.body.Nombre;
    objPersona.Apellido = req.body.Apellido;
    objPersona.Edad = req.body.Edad;
    objPersona.Sexo = req.body.Sexo;
    objPersona.IsProfesional = req.body.IsProfesional;

    objPersona.save(function (err, retorno) {
        if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, persona: retorno });
    });
};

//Actualizar
exports.updatePersona = function (req, callback) {

    PersonaModel.findById(req.params.id, function (err, persobaBuscada) {
        persobaBuscada.Nombre = req.body.Nombre;
        persobaBuscada.Apellido = req.body.Apellido;
        persobaBuscada.Edad = req.body.Edad;
        persobaBuscada.Sexo = req.body.Sexo;
        persobaBuscada.IsProfesional = req.body.IsProfesional;

        persobaBuscada.save(function (err, resultadoUpdate) {
            if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
            callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, persona: resultadoUpdate });
        });
    });
};

//Eliminar
exports.deletePersona = function (req, callback) {

    PersonaModel.findById(req.params.id, function (err, persobaBuscada) {

        persobaBuscada.remove(function (err) {
            if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
            callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' } });
        });
    });
};
//Buscar person apor id
exports.findByIdPersona = function (req, callback) {

    PersonaModel.findById(req.params.id, function (err, personaBuscada) {

        if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, persona: personaBuscada });

    });
};
//Listar todas las personas del contenedor
exports.findByAllPersona = function (req, callback) {

    PersonaModel.find({}, function (err, personasBuscadas) {

        if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, persona: personasBuscadas });

    });
};