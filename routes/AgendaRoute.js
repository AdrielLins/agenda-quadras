const express = require('express');
const router = express.Router();

const agendaController = require('../controllers/AgendaController');

//create agenda
router.post('/create/', agendaController.CreateAgenda);
//read agenda
router.post('/find/', agendaController.ReadAgenda);
//list all
router.post('/list/', agendaController.ListAgenda);
//update agenda
router.post('/update/', agendaController.UpdateAgenda);
//Insert user on agenda
router.post('/userAgenda/', agendaController.InsertEmailAgenda);
//delete agenda
router.post('/delete/', agendaController.DeleteAgenda);
//alterar status da agenda
router.post('/status/', agendaController.StatusAgenda);
//alterar resultado da agenda
router.post('/resultado/', agendaController.ResultadoAgenda);
//usu�rio setar seu agendamento
router.post('/setAgenda/', agendaController.UserSetAgenda);
//listar agendamentos finalizados do usu�rios
router.post('/listUserFinishedAgenda/', agendaController.ListUserFinishedAgenda);
//listar horarios entre intervalos de datas
router.post('/listBetweenAgenda/', agendaController.ListBetweenAgenda);

module.exports = router;