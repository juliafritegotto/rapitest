const knex = require('knex');

const configuration = require('../../knexfile');

const connection = knex(configuration.development);

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = connection;