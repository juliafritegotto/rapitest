
exports.up = function (knex) {
    return knex.schema.createTable('respostas', function (table) {

        table.increments('pkResposta');
      
        table.integer('fkQuestao').unsigned().notNullable();
        table.integer('fkAlternativa').unsigned().notNullable();

        table.foreign('fkQuestao').references('pkQuestao').inTable('questoes').onDelete('CASCADE');
        table.foreign('fkAlternativa').references('pkAlternativa').inTable('alternativas').onDelete('CASCADE');
    });
};

exports.down = function (knex) {

};
