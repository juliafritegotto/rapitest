const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {

    async index(request, response, next) {

        try {
            const respostas = await connection('respostas').select('*');
            return response.json(respostas);

        } catch (error) {
            next(error);
        }


    },  
    async show(request, response, next) {
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
  /*
    async update(request, response, next) {
        try {
            const { pkResposta } = request.params;
            const changes = request.body;

            const count = await connection('respostas').where({ pkResposta }).update(changes);
            if (count) {
                response.status(200).send("Atualizado com sucesso! =) " + count);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    }, 
    falta atualização na variavél respostaPosição de questão
    */
}