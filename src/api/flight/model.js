const knex = require('../../services/knex');
// const { Model } = require('../../services/models');


class Flight {
  constructor(enitity) {
    this._entity = enitity;
  }

  static TABLE_NAME = "flights";

  static async createTable() {
    const hasTable = await knex.schema.hasTable(Flight.TABLE_NAME);

    if (hasTable) return;

    await knex.schema.createTable(Flight.TABLE_NAME, function (table) {
      table.increments('id').primary();
      table.integer('plane').unsigned().notNullable();
      table.string('time').notNullable();
      table.timestamps(true, true);

      table.foreign('plane').references('planes.id');
    });
  };

  static async findAll() {
    const result = await knex.select("*").from(Flight.TABLE_NAME);
    return result.map((el) => new Flight(el));
  };

  static async findById(id) {
    const result = await knex(Flight.TABLE_NAME).where('id', id);
    return new Flight(result)._entity;
  };

  static async create(body) {
    const createdResult = await knex(Flight.TABLE_NAME).insert(body);

    if (createdResult) {
      return await Flight.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(Flight.TABLE_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return await Flight.findById(id);
    };

    return Flight.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(Flight.TABLE_NAME).where('id', id).del();
  };

};

module.exports.Flight = Flight;

Flight.createTable();