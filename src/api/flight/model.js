const knex = require('../../services/knex');
// const { Model } = require('../../services/models');

class Flight {
  constructor(enitity) {
    this._entity = enitity;
  }

  static MODEL_NAME = "flights";

  static async createTable() {
    await knex.schema.createTableIfNotExists(Flight.MODEL_NAME, function (table) {
      table.increments();
      table.integer('plane').unsigned().notNullable();
      table.string('time').notNullable();
      // table.integer('flights').unsigned().notNullable();
      table.foreign('plane').references('passengerId').inTable('passengers');
      table.timestamps(true, true);
    });
  };

  static async findAll() {
    const result = await knex.select("*").from(Flight.MODEL_NAME);
    return result.map((el) => new Flight(el));
  };

  static async findById(id) {
    return knex(Flight.MODEL_NAME).where('id', id);
  };

  static async create(body) {
    const createdResult = await knex(Flight.MODEL_NAME).insert(body);

    if (createdResult) {
      return Flight.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(Flight.MODEL_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return Flight.findById(id);
    };

    return Flight.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(Flight.MODEL_NAME).where('id', id).del();
  };
};

module.exports.Flight = Flight;

Flight.createTable();
