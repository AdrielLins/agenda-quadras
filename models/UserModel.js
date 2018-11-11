const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 20 },
    firstName: { type: String, required: true, max: 50 },
    lastName: { type: String, required: true, max: 100 },
    cpf: { type: String, required: true, max: 30 },
    phone: { type: String, required: true, max: 30 },
    active:{type: Boolean, required: true},
    adm: { type: Boolean, required: true },
    token: { type: String, required: false }
});

module.exports = mongoose.model('Users', UserSchema);