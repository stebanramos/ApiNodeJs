var mongoose = require("mongoose");
var Schemma = mongoose.Schema;

var personaSchema = new Schemma({
    Nombre: String,
    Apellido: String,
    Edad: Number,
    createAt: {type: Date, required: true, default: Date.now},
    Sexo: {type: String, enum: ['Masculino', 'Femenino', 'Otro']},
    IsProfesional: Boolean
});

module.exports = mongoose.model('Persona', personaSchema);