const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

//create user
router.post('/create', userController.CreateUser);
//read user
 router.get('/:email', userController.ReadUser);
//list all
// router.get('/list', userController.ListUser);
//update user
router.put('/update/:id', userController.UpdateUser);
//delete user
router.delete('/delete/:id', userController.DeleteUser);

module.exports = router;