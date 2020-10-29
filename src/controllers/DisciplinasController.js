const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async index(request, response, next) {

        try {
            const disciplinas = await connection('disciplinas').select('*');
            return response.json(disciplinas);

        } catch (error) {
            next(error);
        }


    },

    async create(request, response, next) {
        try {

            const { nomeDisciplina } = request.body;

            const [pkDisciplina] = await connection('disciplinas').insert({
                nomeDisciplina,
            });
            response.status(201).send("Criado com sucesso =) " + pkDisciplina);

        } catch (error) {
            next(error);
        }


    },
    async update(request, response, next) {
        try {
            const { pkDisciplina } = request.params;
            const changes = request.body;

            const count = await connection('disciplinas').where({ pkDisciplina }).update(changes);
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
            const { pkDisciplina } = request.params;

            const disciplinas = await connection('disciplinas')
                .where('pkDisciplina', pkDisciplina)
                .select('*');


            const count = await connection('disciplinas').where('pkDisciplina', pkDisciplina).delete();

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