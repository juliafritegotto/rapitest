const connection = require('../database/connection');

module.exports = {
    //faz a listagem de todos as questões
    async index(request, response, next) {
        try {
            const questoes = await connection('questoes').select('*');
            return response.json(questoes);

        } catch (error) {            
            next(error);
        }

    },

    async create(request, response, next) {
        try {

            const { enunciado, alternativas, respostaPosicao, fkNivel } = request.body;

            const [pkQuestao] = await connection('questoes').insert({
                enunciado,
                alternativas,
                respostaPosicao,
                fkNivel,
            });

            return response.json({ pkQuestao });

        } catch (error) {
            next(error);
        }

    },
    async delete(request, response, next) {
        try {
            const { pkQuestao } = request.params;

            const questoes = await connection('questoes')
                .where('pkQuestao', pkQuestao)
                .select('*')
                .first();


            await connection('questoes').where('pkQuestao', pkQuestao).delete();

            return response.status(204).send(); //retorna uma responsa para o frontend sem contéudo

        } catch (error) {
            next(error);
        }
    }
    
}