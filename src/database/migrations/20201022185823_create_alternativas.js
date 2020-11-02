
exports.up = function(knex) {
    return knex.schema.createTable('alternativas', function (table) {
       
        table.increments('pkAlternativa');
        table.string('descricaoAlternativa').notNullable();

        table.integer('fkQuestao').unsigned().notNullable();

        table.foreign('fkQuestao').references('pkQuestao').inTable('questoes').onDelete('CASCADE');

    });
  
};

exports.down = function(knex) {
    knex.schema.dropTable('alternativas');  
};
