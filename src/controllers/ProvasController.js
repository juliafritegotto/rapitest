const { select } = require('../database/connection');
const connection = require('../database/connection');
const HtmlDocx = require('html-to-docx');

async function getQuestoesDadoParametros(request) {
    let { nivel, disciplina, assunto, orderBy, pageSize, page } = request.query;
    orderBy = orderBy || "pkQuestao";
    pageSize = pageSize || "15";
    page = page || "1";

    try {
        const questao = await connection("questoes")
            .select('*').where(function () {
                if (nivel && disciplina && assunto) {
                    this.where("fkNivel", "=", nivel).andWhere("fkDisciplina", "=", disciplina).andWhere("fkAssunto", "=", assunto);
                }
                else if (nivel && disciplina) {
                    this.where("fkNivel", "=", nivel).andWhere("fkDisciplina", "=", disciplina);
                }
                else if (nivel) {
                    this.where("fkNivel", "=", nivel);
                }
                else if (disciplina && assunto) {
                    this.where("fkDisciplina", "=", disciplina).andWhere("fkAssunto", "=", assunto);
                }
                else if (disciplina) {
                    this.where("fkDisciplina", "=", disciplina);
                }
            }).paginate({ perPage: pageSize, currentPage: page });


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

        return questao;


    } catch (error) {
        throw error;
    }
}

module.exports = {
    async index(request, response, next) {
        try {
            const questoes = await getQuestoesDadoParametros(request);
            response.send(questoes);
        }
        catch (e) {
            next(e);
        }
    },

    async indexDoc(request, response, next) {
        const questao = await getQuestoesDadoParametros(request);

        let x = 0;
        let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        let z = 0;

        const docx = await HtmlDocx(`<h1> Prova com (${questao.data.length}) questoes</h1>  
         
            <p>${questao.data.map(function (q) {
            let y = -1;
            x++;
            return ` 
            <p> ${x}) ${q.enunciado}</p>                     
                    ${q.alternativas.map(function (a) {
                y++;
                return `<p>${abc[y]}) ${a.descricaoAlternativa}</p>`

            }).join('')} 
                    </p>               
                `
        }).join('')}
            
            
            <div style="page-break-after: always"></div>    
            <h1> Respostas </h1>
            <p> ${questao.data.map(function (q) {
            z++;
            return `<p><b>${z}) </b> ${abc[q.respostaPosicao]}</p>`
        }).join(' ')} 
            </p>           
            
            `);

        response.set("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessing");
        response.set("Content-Disposition", "attachment; filename=prova.docx");

        response.send(docx);
    }, 
       
    async indexJson(request,response,next){
        const questao = await getQuestoesDadoParametros(request);
        response.send(questao);
    }

};