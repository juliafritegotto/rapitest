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
    async show(request, response, next) {
        const { pkAlternativa } = request.params;
        try {
            const alternativas = await connection('alternativas')
                .where('pkAlternativa', pkAlternativa)
                .select('*')
                .first();

            if (alternativas) {
                return response.json(alternativas);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    },
    async update(request, response, next) {
        
        try {
            const { pkAlternativa } = request.params;
            const changes = request.body;
            
            const count = await connection('alternativas').where({ pkAlternativa }).update(changes);
            if (count) {                
                response.status(200).send("Atualizado com sucesso! =) " + count );
            } else {
                response.status(404).send("Registro não encontrado =/" );
            }

        } catch (error) {
            next(error);
        }
    }



};