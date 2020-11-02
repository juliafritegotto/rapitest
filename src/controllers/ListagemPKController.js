const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {

    async showQuestao(request, response, next) {
        const { pkQuestao } = request.params;
        try {
            const questao = await connection("questoes")
                .where('pkQuestao', pkQuestao)
                .select('*')
                .first();
            if (questao) {
                const alternativas = await connection("alternativas")
                    .where('fkQuestao', pkQuestao)
                    .select('*');

                questao.alternativas = [];
                if (alternativas.length) {
                    questao.alternativas = alternativas;
                }
                response.send(questao);

            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            return next(error);
        }
    },
    async showAlternativa(request, response, next) {
        const { pkAlternativa } = request.params;
        try {
            const alternativas = await connection('alternativas')
                .where('pkAlternativa', pkAlternativa)
                .select('*')
                .first();

            if (alternativas) {
                return response.json(alternativas);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    },
    async showResposta(request, response, next) {
        const { pkResposta } = request.params;
        try {
            const respostas = await connection('respostas')
                .where('pkResposta', pkResposta)
                .select('*')
                .first();

            if (respostas) {
                return response.json(respostas);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    },
    async showDisciplina(request, response, next) {
        const { pkDisciplina } = request.params;
        try {
            const disciplinas = await connection('disciplinas')
                .where('pkDisciplina', pkDisciplina)
                .select('*')
                .first();

            if (disciplinas) {
                return response.json(disciplinas);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    },
    async showAssunto(request, response, next) {
        const { pkAssunto } = request.params;
        try {
            const assuntos = await connection('assuntos')
                .where('pkAssunto', pkAssunto)
                .select('*')
                .first();

            if (assuntos) {
                return response.json(assuntos);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    },
    async showNivel(request, response, next) {
        const { pkNivel } = request.params;
        try {
            const niveisDificuldade = await connection('niveisDificuldade')
                .where('pkNivel', pkNivel)
                .select('*')
                .first();

            if (niveisDificuldade) {
                return response.json(niveisDificuldade);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    },



};