const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mysql = require('mysql');
const PORT = process.env.PORT || 3050;
const app = express();

//Configuracion
app.use(bodyParser.json());
app.use(methodOverride());

//Definir el puerto por el cual vamos a escuchar
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'node20_mysql'
  });

//Definir el entutamiento de las solicitudes
var controladorPersona = require('./controladores/personaControlador.js')
var controladorProducto = require('./controladores/productoControlador.js')
var router = express.Router();

router.get('/', function(req, res){
    res.send("hola mundo del servicio node js");
});

//Persona
//Agregar persona http://localhost:3000/API/persona/AddPersona
router.post('/API/persona/AddPersona', function(req, res){
    controladorPersona.addPersona(req, function(data){
        res.send(data);
    });
});

//Actualizar persona http://localhost:3000/API/persona/UpdatePersona/23
router.put('/API/persona/UpdatePersona/:id', function(req, res){
    controladorPersona.updatePersona(req, function(data){
        res.send(data);
    });
});

//Eliminar personas http://localhost:3000/API/persona/DeletePersona/23
router.delete('/API/persona/DeletePersona/:id', function(req, res){
    controladorPersona.deletePersona(req, function(data){
        res.send(data);
    });
});

//Buscar persona http://localhost:3000/API/persona/FindPersona/23
router.get('/API/persona/FindPersona/:id', function(req, res){
    controladorPersona.findByIdPersona(req, function(data){
        res.send(data);
    });
});

//Todas las personas http://localhost:3000/API/persona/FindAllPersona
router.get('/API/persona/FindAllPersona', function(req, res){
    controladorPersona.findByAllPersona(req, function(data){
        res.send(data);
    });
});

//Producto
//Agregar producto http://localhost:3000/API/producto/AddProducto
router.post('/API/producto/AddProducto', function(req, res){
    controladorProducto.addProducto(req, function(data){
        res.send(data);
    });
});

//Actualizar producto http://localhost:3000/API/producto/UpdateProducto/23
router.put('/API/producto/UpdateProducto/:id', function(req, res){
    controladorProducto.updateProducto(req, function(data){
        res.send(data);
    });
});

//Eliminar producto http://localhost:3000/API/producto/DeleteProducto/23
router.delete('/API/producto/DeleteProducto/:id', function(req, res){
    controladorProducto.deleteProducto(req, function(data){
        res.send(data);
    });
});

//Buscar producto http://localhost:3000/API/producto/FindProducto/23
router.get('/API/producto/FindProducto/:id', function(req, res){
    controladorProducto.findByIdProducto(req, function(data){
        res.send(data);
    });
});

//Todas los productos http://localhost:3000/API/producto/FindAllProducto
router.get('/API/producto/FindAllProducto', function(req, res){
    controladorProducto.findByAllProducto(req, function(data){
        res.send(data);
    });
});

app.use(router);
