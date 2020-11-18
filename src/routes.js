const express = require('express');

const ProvasController = require('./controllers/ProvasController');
const QuestoesController = require('./controllers/QuestoesController');
const NiveisDificuldadeController = require('./controllers/NiveisDificuldadeController');
const DisciplinasController = require('./controllers/DisciplinasController');
const AssuntosController = require('./controllers/AssuntosController');
const AlternativasController = require('./controllers/AlternativasController');
const RespostasController = require('./controllers/RespostasController');

const routes = express.Router();

//Rotas de Provas
routes.get('/provas', ProvasController.indexJson);
routes.get('/provasDoc', ProvasController.indexDoc);

//Rotas de Questões
routes.post('/questoes', QuestoesController.create);
routes.get('/questoes', QuestoesController.index);
routes.get('/questoes/:pkQuestao', QuestoesController.show);
routes.delete('/questoes/:pkQuestao', QuestoesController.delete);
routes.put('/questoes/:pkQuestao', QuestoesController.update);
routes.put('/questoes/:pkQuestao/alternativas', QuestoesController.updateAll);//Altera alternativas e resposta além dos dados da questão

//Rotas de Disciplinas
routes.post('/disciplinas', DisciplinasController.create);
routes.get('/disciplinas', DisciplinasController.index);
routes.get('/disciplinas/:pkDisciplina', DisciplinasController.show);
routes.delete('/disciplinas/:pkDisciplina', DisciplinasController.delete);
routes.put('/disciplinas/:pkDisciplina', DisciplinasController.update);

//Rotas de Assuntos
routes.post('/assuntos',AssuntosController.create);
routes.get('/assuntos',AssuntosController.index);
routes.get('/assuntos/:pkAssunto', AssuntosController.show);
routes.delete('/assuntos/:pkAssunto',AssuntosController.delete);
routes.put('/assuntos/:pkAssunto',AssuntosController.update);

//Rotas de Niveis de Dificuldade
routes.post('/niveisDificuldade', NiveisDificuldadeController.create);
routes.get('/niveisDificuldade', NiveisDificuldadeController.index);
routes.get('/niveisDificuldade/:pkNivel', NiveisDificuldadeController.show);
routes.delete('/niveisDificuldade/:pkNivel', NiveisDificuldadeController.delete);
routes.put('/niveisDificuldade/:pkNivel', NiveisDificuldadeController.update);

//Rotas de Alternativas
routes.get('/alternativas', AlternativasController.index);
routes.get('/alternativas/:pkAlternativa', AlternativasController.show);
routes.put('/alternativas/:pkAlternativa', AlternativasController.update);

//Rotas de Respostas
routes.get('/respostas', RespostasController.index);
routes.get('/respostas/:pkResposta', RespostasController.show);


module.exports = routes;