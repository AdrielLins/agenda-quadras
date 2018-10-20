const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AgendaSchema = new Schema({
    dateAgenda: { type: Date, required: true },
    quadraNumero: { type: Number, required: true },
    esporteValor: { type: Number, required: true },
    esporteModalidade: { type: String, required: true },
    status: { type: String, required: true },
    userEmail: { type: String },
    resultado: { type: String }
});

module.exports = mongoose.model('Agendas', AgendaSchema);