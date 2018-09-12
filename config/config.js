// Configurações de conexão com o banco

const mongoose = require('mongoose');
const mongoDBUrl = 'mongodb://admin:masterkey1@ds163181.mlab.com:63181/adrielproject';
const mongoDBUrlLocal = 'mongodb://127.0.0.1:27017/adrielproject';

mongoose.connect(mongoDBUrlLocal, { useMongoClient: true  });
mongoose.Promise = global.Promise;

const connectionDB = mongoose.connection;

console.log('Connecting DataBase adrielproject');
connectionDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connectionDB;