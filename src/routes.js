const express = require('express');

const QuestoesController = require('./controllers/QuestoesController');
const NiveisDificuldadeController = require('./controllers/NiveisDificuldadeController');
const DisciplinasController = require('./controllers/DisciplinasController');
const AssuntosController = require('./controllers/AssuntosController');


const AlternativasController = require('./controllers/AlternativasController');

const routes = express.Router();

//rota para listar todas as questões
routes.get('/questoes', QuestoesController.index);
routes.get("/questoes/:pkQuestao", QuestoesController.getOne);


routes.post('/questoes', QuestoesController.create);
routes.delete('/questoes/:pkQuestao', QuestoesController.delete);
routes.put('/questoes/:pkQuestao', QuestoesController.update);
routes.put('/questoes/:pkQuestao', QuestoesController.updateAll);



routes.post('/niveisDificuldade', NiveisDificuldadeController.create);
routes.get('/niveisDificuldade', NiveisDificuldadeController.index);
routes.delete('/niveisDificuldade/:pkNivel', NiveisDificuldadeController.delete);
routes.put('/niveisDificuldade/:pkNivel', NiveisDificuldadeController.update);

routes.post('/disciplinas', DisciplinasController.create);
routes.get('/disciplinas', DisciplinasController.index);
routes.delete('/disciplinas/:pkDisciplina', DisciplinasController.delete);
routes.put('/disciplinas/:pkDisciplina', DisciplinasController.update);



routes.post('/assuntos',AssuntosController.create);
routes.get('/assuntos',AssuntosController.index);
routes.delete('/assuntos/:pkAssunto',AssuntosController.delete);
routes.put('/assuntos/:pkAssunto',AssuntosController.update);

routes.get('/alternativas', AlternativasController.index);

module.exports = routes;