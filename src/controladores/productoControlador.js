var mongoose = require('mongoose');
require('../modelos/productoModel.js');

var ProductoModel = mongoose.model('Producto');

//Agregar objetos producto a el contenedor
exports.addProducto = function (req, callback) {
    var objProducto = new ProductoModel();
    objProducto.Nombre = req.body.Nombre;
    objProducto.Cantidad = req.body.Cantidad;
    objProducto.Precio = req.body.Precio;

    objProducto.save(function (err, retorno) {
        if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, producto: retorno });
    });
};

//Actualizar
exports.updateProducto = function (req, callback) {

    ProductoModel.findById(req.params.id, function (err, productoBuscado) {
        productoBuscado.Nombre = req.body.Nombre;
        productoBuscado.Cantidad = req.body.Cantidad;
        productoBuscado.Precio = req.body.Precio;

        productoBuscado.save(function (err, resultadoUpdate) {
            if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
            callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, producto: resultadoUpdate });
        });
    });
};

//Eliminar
exports.deleteProducto = function (req, callback) {

    ProductoModel.findById(req.params.id, function (err, productoBuscado) {

        productoBuscado.remove(function (err) {
            if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
            callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' } });
        });
    });
};
//Buscar producto por id
exports.findByIdProducto = function (req, callback) {

    ProductoModel.findById(req.params.id, function (err, productoBuscado) {

        if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, producto: productoBuscado });

    });
};
//Listar todas los productos del contenedor
exports.findByAllProducto = function (req, callback) {

    ProductoModel.find({}, function (err, productoBuscado) {

        if (err) callback({ estado: { codigo: 2, respuesta: err.message } });
        callback({ estado: { codigo: 1, respuesta: 'proceso exitoso' }, producto: productoBuscado });

    });
};