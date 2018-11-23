// Servidor da aplicação
console.log('Starting server');

const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
const app = express();
const cors = require('cors');
const connectionDB = require('./config/config');

// initialize cookie-parser to allow access to the cookies stored in the browser. 
app.use(cookieParser());

var session = require('express-session');

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  },
  store: new MongoStore( url: 'mongodb://admin:masterkey1@ds115154.mlab.com:15154/session')
}));

// This check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
  if(!req.session.userToRecover){
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');
    }
  }
  next();
});

// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set morgan to log info about our requests for development use.
//app.use(morgan('dev'));

//import admin lte
app.use('/script', express.static(__dirname + '/node_modules/admin-lte/'));

// Initialize api routes
app.use('/api/users', require('./routes/UserRoute'));
app.use('/api/fields', require('./routes/FieldRoute'));
app.use('/api/sports', require('./routes/SportRoute'));
app.use('/api/agendas', require('./routes/AgendaRoute'));
app.use('/api/recoverPass', require('./routes/RecoverPass'));

// Initialize routes for user navigation
app.use('/', require('./routes/navigationRoutes'));

//Set public folder
app.use(express.static('public'));

//Enable cross origin requests
if (process.env.CORS) {
  app.use(cors());
}

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});
//for use on heroku deployments
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//const server = app.listen(port, () => {
//  console.log('Server is up and running on port number ' + port);
//});

module.exports = app //for unitary testing
