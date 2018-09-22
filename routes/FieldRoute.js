const express = require('express');
const router = express.Router();

const fieldController = require('../controllers/FieldController');
//create field
router.post('/create/', fieldController.CreateField);
//read field
router.post('/find/', fieldController.ReadField);
//list all
router.post('/list/', fieldController.ListField);
//update field
router.post('/update/', fieldController.UpdateField);
//delete field
router.post('/delete/', fieldController.DeleteField);

module.exports = router;