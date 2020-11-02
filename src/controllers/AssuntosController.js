const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async index(request, response, next) {

        try {
            const assuntos = await connection('assuntos')
                .join('disciplinas', 'pkDisciplina', '=', 'assuntos.fkDisciplina')
                .select('assuntos.*', 'nomeDisciplina');

            return response.json(assuntos);

        } catch (error) {
            next(error);
        }


    },
   
    async create(request, response, next) {
        try {

            const { nomeAssunto, fkDisciplina } = request.body;

            const [pkAssunto] = await connection('assuntos').insert({
                nomeAssunto,
                fkDisciplina
            });
            return response.status(201).send("Criado com sucesso =) " + pkAssunto);
        } catch (error) {
            next(error);
        }


    },
    async update(request, response, next) {
        try {
            const { pkAssunto } = request.params;
            const changes = request.body;

            const count = await connection('assuntos').where({ pkAssunto }).update(changes);
            
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
            const { pkAssunto } = request.params;

            const assuntos = await connection('assuntos')
                .where('pkAssunto', pkAssunto)
                .select('*');


            const count = await connection('assuntos').where('pkAssunto', pkAssunto).delete();

            if (count) {
                response.status(200).send("Deletado com sucesso! " + count);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    }


};