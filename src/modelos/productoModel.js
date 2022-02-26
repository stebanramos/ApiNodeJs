var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    Nombre: String,
    Cantidad: Number,
    Precio: Number,
    createAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Producto', productoSchema);