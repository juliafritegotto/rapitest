
exports.up = function(knex) {
    knex.schema.createTable('questoes', function(table){
            table.increments('pkQuestao');
            table.string('enunciado').notNullable();
            //table.specificType('alternativas', 'text[]')    
    });
  
};

exports.down = function(knex) {
  knex.schema.dropTable('questoes');
};
