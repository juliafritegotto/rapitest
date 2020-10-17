const connection = require('../database/connection');

module.exports = {
    //faz a listagem de todos as questões
    async index(request, response) {
        const questoes = await connection('questoes').select('*');

        return response.json(questoes);
    },

    async create(request, response) {
        const { enunciado, alternativas, respostaPosicao, fkNivel } = request.body;


        const [pkQuestao] = await connection('questoes').insert({
            enunciado,
            alternativas,
            respostaPosicao,
            fkNivel,
        });
        return response.json({ pkQuestao });
    }

};