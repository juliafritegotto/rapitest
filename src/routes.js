const express = require('express');

const QuestoesController = require('./controllers/QuestoesController');
const NiveisDificuldadeController = require('./controllers/NiveisDificuldadeController');

const routes = express.Router();

//rota para listar todas as questões
routes.get('/questoes', QuestoesController.index);

//rota para criar questões
routes.post('/questoes', QuestoesController.create);

routes.delete('/questoes/:pkQuestao', QuestoesController.delete);


routes.post('/niveisDificuldade',NiveisDificuldadeController.create);
routes.get('/niveisDificuldade',NiveisDificuldadeController.index);
routes.delete('/niveisDificuldade/:pkNivel', NiveisDificuldadeController.delete);


module.exports = routes;