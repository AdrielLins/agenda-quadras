// Servidor da aplicação
console.log('Starting server');

const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
const app = express();
const cors = require('cors');
const connectionDB = require('./config/config');

// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize cookie-parser to allow access to the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// This check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('./script/index2.html');
  } else {
    next();
  }
};
//check if user is already logged in
app.get('/', sessionChecker, (req, res) => {
  res.redirect('/index.html');
});

//check if user is logged in on other pages

app.get('/home', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.sendFile(__dirname + './script/index2.html');
  } else {
    //redirect to login page
      res.redirect('./index.html');
  }
});

//Set public folder
app.use(express.static('public'));

//import admin lte
app.use('/script', express.static(__dirname + '/node_modules/admin-lte/'));

// Initialize users routes
app.use('/api/users', require('./routes/UserRoute'));

//Enable cross origin requests
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