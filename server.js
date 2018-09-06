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

app.use('/user', user);

let port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

if(process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', function(err) {
      console.error('FATAL: Uncaught exception.');
      console.error(err.stack||err);
      setTimeout(function(){
        process.exit(1);
      }, 100);
    });
}
