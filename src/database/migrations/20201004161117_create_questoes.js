
exports.up = function(knex) {
    return knex.schema.createTable('questoes', function(table){

            table.increments('pkQuestao');

            table.string('enunciado').notNullable();
            table.string('alternativas');
            table.int('respostaPosicao').notNullable();
            
            table.integer('fkNivel').unsigned();
            table.integer('fkDisciplina').unsigned();

           table.foreign('fkDisciplina').references('pkDisciplina').inTable('disciplinas');
            table.foreign('fkNivel').references('pkNivel').inTable('niveisDificuldade');
           
    });
  
};

exports.down = function(knex) {
  knex.schema.dropTable('questoes');
};
