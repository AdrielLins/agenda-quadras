const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

// middleware function, check if user is already logged in
var sessionChecker = (req, res, next) => {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('./login.html');
    } else {
        next();
    }
};

//check if user is already logged in while goin to home page
router.get('/', sessionChecker, (req, res) => {
    res.redirect('./home.html');
});
//check if user is already logged in while goin to home page
router.get('/home.html', sessionChecker, (req, res) => {
    res.redirect('./home.html');
});


// route for user logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('./login.html');
    }
});

module.exports = router;