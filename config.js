// Configurações de conexão com o banco

const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const mongoDBUrl = 'mongodb://admin:masterkey1@ds163181.mlab.com:63181/adrielproject';
const mongoDB = process.env.MONGODB_URI || mongoDBUrl;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const connectionDB = mongoose.connection;

console.log('Connecting DataBase adrielproject');
connectionDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connectionDB;
// module.exports = uniqueValidator;