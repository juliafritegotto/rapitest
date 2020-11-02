
exports.up = function (knex) {
  return knex.schema.createTable('questoes', function (table) {

    table.increments('pkQuestao');

    table.string('enunciado').notNullable();

    table.int('respostaPosicao').notNullable();

    table.integer('fkNivel').unsigned();
    table.integer('fkDisciplina').unsigned().notNullable();
    table.integer('fkAssunto').unsigned().notNullable();

    table.foreign('fkDisciplina').references('pkDisciplina').inTable('disciplinas');
    table.foreign('fkNivel').references('pkNivel').inTable('niveisDificuldade');
    table.foreign('fkAssunto').references('pkAssunto').inTable('assuntos');
    
    //table.string('alternativas');
  });

};

exports.down = function (knex) {
  knex.schema.dropTable('questoes');
};
