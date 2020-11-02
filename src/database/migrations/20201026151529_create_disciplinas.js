
exports.up = function(knex) {
    return knex.schema.createTable('disciplinas', function (table) {
        table.increments('pkDisciplina');
        table.string('nomeDisciplina').notNullable();
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('disciplinas');
}
