const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SportSchema = new Schema({
    modalidade: { type: String, required: true, max: 100 },
    valor: { type: String, required: true}
});

module.exports = mongoose.model('Sports', SportSchema);