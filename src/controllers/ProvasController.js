const { select } = require('../database/connection');
const connection = require('../database/connection');


module.exports = {
    /*
    async index(request, response, next) {
        const { fkNivel, fkDisciplina, fkAssunto, qtdQuestoes } = request.query;

        let query = {};

        if (fkNivel != null) query.fkNivel = fkNivel;
        if (fkDisciplina!= null) query.fkDisciplina = fkDisciplina;
        if (fkAssunto != null) query.fkAssunto = fkAssunto;
        if (qtdQuestoes != null) query.qtdQuestoes = qtdQuestoes;
    console.log(query)
   
        try {

            const questao = await connection("questoes").select('*');

            const aPromises = [];
            for (let i = 0; i < questao.length; i++) {
                const q = questao[i];
                aPromises.push(
                    connection("alternativas")
                        .where('fkQuestao', q.pkQuestao).then(alternativas => {
                            q.alternativas = [];
                            if (alternativas.length) {
                                q.alternativas.push(...alternativas);
                            }
                            else {
                                q.alternativas.push(alternativas);
                            }
                        })
                );
            }
            await Promise.all(aPromises);
            response.send(questao);

        } catch (error) {
            next(error);
        }
    }
*/

};