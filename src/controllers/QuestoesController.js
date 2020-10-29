const connection = require('../database/connection');

module.exports = {

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
            if (questao) {
                const alternativas = await connection("alternativas")
                    .where('fkQuestao', pkQuestao)
                    .select('*');

                questao.alternativas = [];
                if (alternativas.length) {
                    questao.alternativas = alternativas;
                }
                response.send(questao);
                
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            return next(error);
        }
    },

    async create(request, response, next) {
        let id;
        let idAlternativa;

        const { enunciado, respostaPosicao, fkNivel, fkDisciplina, fkAssunto, alternativas } = request.body;

        const pkD = await connection('assuntos')
            .join('disciplinas', 'pkDisciplina', '=', 'assuntos.fkDisciplina')
            .where('pkAssunto', fkAssunto)
            .select('fkDisciplina');

        if (pkD[0].fkDisciplina !== fkDisciplina) {
            response.status(500).send("Viola a integridade de chave");
        }

        else {
            try {

                await connection.transaction(async (tx) => {
                    try {
                        const [pkQuestao] = await connection("questoes").transacting(tx).insert({
                            enunciado,
                            respostaPosicao,
                            fkNivel,
                            fkDisciplina,
                            fkAssunto
                        });
                        id = pkQuestao;

                        for (let i = 0; i < alternativas.length; i++) {
                            const { descricaoAlternativa } = alternativas[i];
                            const alt = await connection("alternativas").transacting(tx).insert({
                                fkQuestao: pkQuestao,
                                descricaoAlternativa: alternativas[i]
                            });
                            if (i == respostaPosicao) {
                                idAlternativa = alt;
                            }


                        }

                        await connection("respostas").transacting(tx).insert({
                            fkQuestao: pkQuestao,
                            fkAlternativa: idAlternativa

                        });
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

        }


    },
    async update(request, response, next) {
        try {
            const { pkQuestao } = request.params;
            const changes = request.body;

            const count = await connection('questoes').where({ pkQuestao }).update(changes);
            if (count) {
                response.status(200).send("Atualizado com sucesso! =) " + count);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    },

    async updateAll(request, response, next) {

        const { pkQuestao } = request.params;
        const { enunciado, respostaPosicao, fkNivel, fkDisciplina, fkAssunto, alternativas } = request.body;

        const pksAlternativa = await connection("alternativas")
            .where('fkQuestao', pkQuestao)
            .select('*');

        let id;
        try {

            await connection.transaction(async (tx) => {
                try {
                    const count = await connection("questoes").transacting(tx).where('pkQuestao', pkQuestao).update({
                        enunciado,
                        respostaPosicao,
                        fkNivel,
                        fkDisciplina,
                        fkAssunto
                    });


                    for (let i = 0; i < alternativas.length; i++) {

                        const { descricaoAlternativa } = alternativas[i];
                        const count = await connection("alternativas").transacting(tx).where('pkAlternativa', pksAlternativa[i].pkAlternativa).update({
                            descricaoAlternativa: alternativas[i].descricaoAlternativa
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

            const count = await connection('questoes').where('pkQuestao', pkQuestao).delete();

            if (count) {
                response.status(200).send("Deletado com sucesso! " + count);
            } else {
                response.status(404).send("Registro não encontrado =/");
            }

        } catch (error) {
            next(error);
        }
    }

}