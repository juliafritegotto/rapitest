const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const niveisDificuldade = await connection('niveisDificuldade').select('*');

        return response.json(niveisDificuldade);

    },

    async create(request, response) {
        const { nomeNivel } = request.body;

        const [pkNivel] = await connection('niveisDificuldade').insert({
            nomeNivel,
        });
        return response.json({ pkNivel});
    },

    async delete(request, response) {
        const { pkNivel } = request.params;

        const niveisDificuldade = await connection('niveisDificuldade')
            .where('pkNivel', pkNivel)
            .select('*');
           

        await connection('niveisDificuldade').where('pkNivel', pkNivel).delete();

        return response.status(204).send(); //retorna uma responsa para o frontend sem contéudo
    }


};