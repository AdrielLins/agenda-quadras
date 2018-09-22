const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FieldSchema = new Schema({
    descricao: { type: String, required: true, max: 100 },
    numero: { type: String, required: true}
});

module.exports = mongoose.model('Fields', FieldSchema);