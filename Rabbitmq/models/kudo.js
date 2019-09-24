const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let kudoSchema = new Schema({
    fuente: { type: Number, ref: 'Usuario' },
    destino: { type: Number, ref: 'Usuario' },
    tema: { type: String, required: [true, 'El tema es necesario'] },
    fecha: { type: String, required: [true, 'La fecha es necesaria'] },
    lugar: { type: String, required: [true, 'El lugar es necesario'] },
    texto: { type: String, required: [true, 'El texto es necesario'] }

});


module.exports = mongoose.model('kudo', kudoSchema);