const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async index(request, response, next) {

        try {
            const niveisDificuldade = await connection('niveisDificuldade').select('*');
            return response.json(niveisDificuldade);

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
            return response.status(201).send("Criado com sucesso =) " + pkNivel);

        } catch (error) {
            next(error);
        }


    },
    async update(request, response, next) {
        try {
            const { pkNivel } = request.params;
            const changes = request.body;
            
            const count = await connection('niveisDificuldade').where({ pkNivel }).update(changes);
            if (count) {
                response.status(200).send("Atualizado com sucesso! =) " + count);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

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


            const count = await connection('niveisDificuldade').where('pkNivel', pkNivel).delete();

            if (count) {
                response.status(200).send("Deletado com sucesso!  " + count);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }
           

        } catch (error) {
            next(error);
        }
    }


};