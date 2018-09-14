const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 20 },
    firstName: { type: String, required: true, max: 50 },
    lastName: { type: String, required: true, max: 100 },
    cpf: { type: String, required: true, max: 30 },
    phone: { type: String, required: true, max: 30 },
    adm: { type: Boolean, required: true }
});

module.exports = mongoose.model('Users', UserSchema);