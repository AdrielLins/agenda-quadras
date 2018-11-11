const express = require('express');
const router = express.Router();

const RecoverPassController = require('../controllers/RecoverPassController');
//send email to recover
router.post('/sendtoken/', RecoverPassController.RecoverPass);

module.exports = router;