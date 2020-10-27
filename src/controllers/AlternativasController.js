const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async index(request, response, next) {

        try {
            const alternativas = await connection('alternativas').select('*');
            return response.json(alternativas);

        } catch (error) {
            next(error);
        }


    },

    async create(request, response, next) {
        try {
            
            const { nomeNivel } = request.body;

            const [pkNivel] = await connection('niveisDificuldade').insert({
                nomeNivel,
            });
            return response.json({ pkNivel });

        } catch (error) {
            next(error);
        }


    },

    async delete(request, response, next) {
        try {
            const { pkNivel } = request.params;

            const niveisDificuldade = await connection('niveisDificuldade')
                .where('pkNivel', pkNivel)
                .select('*');


            await connection('niveisDificuldade').where('pkNivel', pkNivel).delete();

            return response.status(204).send("Deletado com sucesso =) " ); 

        } catch (error) {
            next(error);
        }
    }


};