const knex = require('../../services/knex');
// const { Model } = require('../../services/models');

class Passenger {
  constructor(enitity) {
    this._entity = enitity;
  }

  static MODEL_NAME = "passengers";

  static async createTable() {
    await knex.schema.createTableIfNotExists(Passenger.MODEL_NAME, function (table) {
      table.increments();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('country').notNullable();
      table.integer('flights').unsigned().notNullable();
      table.foreign('flights').references('flightId').inTable('passengers_flights');
      table.timestamps(true, true);
    });
  };

  static async findAll() {
    const result = await knex.select("*").from(Passenger.MODEL_NAME);
    return result.map((el) => new Passenger(el));
  };

  static async findById(id) {
    return knex(Passenger.MODEL_NAME).where('id', id);
  };

  static async create(body) {
    const createdResult = await knex(Passenger.MODEL_NAME).insert(body);

    if (createdResult) {
      return Passenger.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(Passenger.MODEL_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return Passenger.findById(id);
    };

    return Passenger.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(Passenger.MODEL_NAME).where('id', id).del();
  };
};

module.exports.Passenger = Passenger;

Passenger.createTable();
