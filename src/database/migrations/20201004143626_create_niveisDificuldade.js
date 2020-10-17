
exports.up = function (knex) {
    return knex.schema.createTable('niveisDificuldade', function (table) {
        table.increments('pkNivel');
        table.string('nomeNivel').notNullable();
    });

};

exports.down = function (knex) {
    knex.schema.dropTable('niveisDificuldade');
};
