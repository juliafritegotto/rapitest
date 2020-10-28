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
            return response.json({ pkDisciplina });

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
            const { pkDisciplina } = request.params;

            const disciplinas = await connection('disciplinas')
                .where('pkDisciplina', pkDisciplina)
                .select('*');


            await connection('disciplinas').where('pkDisciplina', pkDisciplina).delete();

            return response.status(204).send(); //retorna uma responsa para o frontend sem contéudo

        } catch (error) {
            next(error);
        }
    }


};