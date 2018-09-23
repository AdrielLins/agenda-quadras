const express = require('express');
const router = express.Router();

const sportController = require('../controllers/SportController');
//create sport
router.post('/create/', sportController.CreateSport);
//read sport
router.post('/find/', sportController.ReadSport);
//list all
router.post('/list/', sportController.ListSport);
//update sport
router.post('/update/', sportController.UpdateSport);
//delete sport
router.post('/delete/', sportController.DeleteSport);

module.exports = router;