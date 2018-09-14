// Servidor da aplicação
console.log('Starting server');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const connectionDB = require('./config/config');

// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set public folder
app.use(express.static('public'));
//import admin lte
app.use('/script', express.static(__dirname + '/node_modules/admin-lte/'));
// Initialize routes
app.use('/api/users', require('./routes/UserRoute'));

if (process.env.CORS) {
  app.use(cors());
}
// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

if (process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function (err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack || err);
    setTimeout(function () {
      process.exit(1);
    }, 100);
  });
}
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});