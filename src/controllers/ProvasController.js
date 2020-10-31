const { select } = require('../database/connection');
const connection = require('../database/connection');


module.exports = {
    async index(request, response, next) {
        let { nivel, disciplina, orderBy, pageSize, page } = request.query;
        orderBy = orderBy || "pkQuestao";
        pageSize = pageSize || "15";
        page = page || "1";   

        try {
            const questao = await connection("questoes")            
                .select('*').where(function () {
                    if(nivel && disciplina) {
                        this.where("fkNivel", "=", nivel).andWhere("fkDisciplina", "=", disciplina);
                    }
                    else if(nivel) {
                        this.where("fkNivel", "=", nivel);
                    }
                    else if(disciplina) {
                        this.where("fkDisciplina", "=", disciplina);
                    }
                }).paginate({perPage: pageSize, currentPage: page});
              
                       
            const aPromises = [];
            for (let i = 0; i < questao.data.length; i++) {
                const q = questao.data[i];
                
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

};