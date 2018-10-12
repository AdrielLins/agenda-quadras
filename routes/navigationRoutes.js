const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

//check if user is already logged in while goin to home page
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('./home.html');
    } else {
        res.redirect('./login.html');
    }
});

//check if user is already logged in while goin to home page with post method
router.post('/home.html', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('./home.html');
        next();
    } else {
        res.redirect('./login.html');
    }
});

//check if user is already logged in while goin to home page
router.get('/home.html', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('./login.html');
    }
});

//check if user is already logged in while goin to manageUser
router.get('/manageUser.html', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid && req.session.adm) {
        next();
    } else {
        res.redirect('./home.html');
    }
});

//check if user is already logged in while goin to manageUser
router.get('/manageField.html', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid && req.session.adm) {
        next();
    } else {
        res.redirect('./home.html');
    }
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