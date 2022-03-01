var personaSchema ={
    Nombre: String,
    Apellido: String,
    Edad: Number,
    createAt: {type: Date, required: true, default: Date.now},
    Sexo: {type: String, enum: ['Masculino', 'Femenino', 'Otro']},
    IsProfesional: Boolean
};

export{personaSchema};