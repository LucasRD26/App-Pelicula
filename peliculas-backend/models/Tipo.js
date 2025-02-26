const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombre: {
        type: String,
        required: true,
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

module.exports = model('Tipo', TipoSchema);