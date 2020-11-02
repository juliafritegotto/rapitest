
exports.up = function(knex) {
    return knex.schema.createTable('assuntos', function (table) {
        
        table.increments('pkAssunto');
        table.string('nomeAssunto').notNullable();
        table.integer('fkDisciplina').unsigned().notNullable();

        table.foreign('fkDisciplina').references('pkDisciplina').inTable('disciplinas');

    });
};

exports.down = function(knex) {
    knex.schema.dropTable('assuntos');  
};
