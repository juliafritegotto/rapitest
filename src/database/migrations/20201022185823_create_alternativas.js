
exports.up = function(knex) {
    return knex.schema.createTable('alternativas', function (table) {
        table.increments('pkAlternativa');
        table.string('descricaoAlternativa').notNullable();

        table.integer('fkQuestao').unsigned();

        table.foreign('fkQuestao').references('pkQuestao').inTable('questoes');

    });
  
};

exports.down = function(knex) {
    knex.schema.dropTable('alternativas');  
};
