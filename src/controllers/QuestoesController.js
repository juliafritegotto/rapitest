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
    async update(request, response, next) {
        try {
            const { pkQuestao } = request.params;
            const changes = request.body;

            const count = await connection('questoes').where({ pkQuestao }).update(changes);
            if (count) {
                response.status(200).json({ updated: count })
            } else {
                response.status(404).json({ message: "Record not found" })
            }

        } catch (error) {
            next(error);
        }
    },

    async updateAll(request, response, next) {

        const { pkQuestao } = request.params;
        const { enunciado, respostaPosicao, fkNivel, fkDisciplina, alternativas } = request.body;

        /*

           const { pkQuestao } = request.params;
            const changes = request.body;
            
            const count = await connection('questoes').where({ pkQuestao }).update(changes);
        */
        let id;
        try {


            await connection.transaction(async (tx) => {
                try {
                    const count = await connection("questoes").transacting(tx).where('pkQuestao', pkQuestao).update({
                        enunciado,
                        respostaPosicao,
                        fkNivel,
                        fkDisciplina
                    });

                    for (let i = 0; i < alternativas.length; i++) {
                        const { descricaoAlternativa } = alternativas[i];
                        const count = await connection("alternativas").transacting(tx).where('pkQuestao', fkQuestao).update({
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
        response.status(201).send("Atualizado com sucesso =) ");

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