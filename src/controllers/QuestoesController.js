const connection = require('../database/connection');

module.exports = {
    //faz a listagem de todos as questões
    async index(request, response, next) {
        try {

            const questao = await connection("questoes")
                .select('*');

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
    },

    async getOne(request, response, next) {
        const { pkQuestao } = request.params;
        try {
            const questao = await connection("questoes")
                .where('pkQuestao', pkQuestao)
                .select('*')
                .first();

            const alternativas = await connection("alternativas")
                .where('fkQuestao', pkQuestao)
                .select('*');

            questao.alternativas = [];
            if (alternativas.length) {
                questao.alternativas = alternativas;
            }

            response.send(questao);
        } catch (error) {
            return next(error);
        }
    },

    async create(request, response, next) {
        let id;
        try {
            const { enunciado, respostaPosicao, fkNivel, fkDisciplina, alternativas } = request.body;

            await connection.transaction(async (tx) => {
                try {
                    const [pkQuestao] = await connection("questoes").transacting(tx).insert({
                        enunciado,
                        respostaPosicao,
                        fkNivel,
                       fkDisciplina
                    });
                    id = pkQuestao;
                    for (let i = 0; i < alternativas.length; i++) {
                        const { descricaoAlternativa } = alternativas[i];
                        await connection("alternativas").transacting(tx).insert({
                            fkQuestao: pkQuestao,
                            descricaoAlternativa: alternativas[i]
                        });
                    }
                    await tx.commit();
                }
                catch (e) {
                    await tx.rollback();
                    next(e);
                }
            });

        } catch (error) {
            return next(error);
        }
        response.status(201).send("Criado com sucesso =) " + id);

    },
    async delete(request, response, next) {
        try {
            const { pkQuestao } = request.params;

            const questoes = await connection('questoes')
                .where('pkQuestao', pkQuestao)
                .select('*')
                .first();           

            await connection('questoes').where('pkQuestao', pkQuestao).delete();
   
            return response.status(204).send();

        } catch (error) {
            next(error);
        }
    }

}