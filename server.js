// Servidor da aplicação
console.log('Starting server');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectionDB = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Classes
const user = require('./routes/UserRoute');

//TODO change this!
app.use('/user', user);


let port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
