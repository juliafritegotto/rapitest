
exports.up = function(knex) {
    return knex.schema.createTable('questoes', function(table){

            table.increments('pkQuestao');

            table.string('enunciado').notNullable();
            table.string('alternativas').notNullable();
            table.int('respostaPosicao').notNullable();
            
            table.integer('fkNivel').unsigned();

            table.foreign('fkNivel').references('pkNivel').inTable('niveisDificuldade');

            //table.specificType('alternativas', 'text[]')    
    });
  
};

exports.down = function(knex) {
  knex.schema.dropTable('questoes');
};
