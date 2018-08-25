const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email:{type: String, required: true},
    password:{type: Number, required: true},
    firstName: {type: String, required: true, max: 50},
    lastName: {type: String, required: true, max: 100},
    cpf: {type: String, required: true, max: 30},
    phone: {type: Number, required: true},
    adm: {type: Boolean, required: true}
});

module.exports = mongoose.model('User', UserSchema);