const mongoose = require('mongoose');

const GeneroSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    estado:{
        type: String,
        required: true,
        enum: [
            'Activo', 'Inactivo'
        ]
    },
    fechaCreacion: {
        type: Date,
        required:true,
    },
    fechaActualizacion: {
        type: Date,
        required:true,
    },
    
    decripcion: {
        type: String,
        required:true,
    }
});

module.exports = model('Genero', GeneroSchema);