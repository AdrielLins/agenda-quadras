const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

//create user
router.post('/create/', userController.CreateUser);
//read user
router.post('/find/', userController.ReadUser);
//list all
router.post('/list/', userController.ListUser);
//update user
router.post('/update/', userController.UpdateUser);
//update user
router.post('/login/', userController.loginUser);
//delete user
router.post('/delete/', userController.DeleteUser);

module.exports = router;