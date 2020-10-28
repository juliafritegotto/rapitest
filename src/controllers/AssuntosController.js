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
            return response.json({ pkAssunto });

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
                response.status(200).json({ updated: count })
            } else {
                response.status(404).json({ message: "Record not found" })
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


            await connection('assuntos').where('pkAssunto', pkAssunto).delete();

            return response.status(204).send(); 

        } catch (error) {
            next(error);
        }
    }


};