
const knex = require('../../services/knex');

class Passenger {
  constructor(enitity) {
    this._entity = enitity;
  }

  static TABLE_NAME = "passengers";

  static async createTable() {
    const hasTable = await knex.schema.hasTable(Passenger.TABLE_NAME);

    if (hasTable) return;

    await knex.schema.createTable(Passenger.TABLE_NAME, function (table) {
      table.increments('id').primary();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('country').notNullable();
      table.timestamps(true, true);
    });
  };

  static async findAll() {
    const result = await knex.select("*").from(Passenger.TABLE_NAME);
    return result.map((el) => new Passenger(el));
  };

  static async findById(id) {
    const result = await knex(Passenger.TABLE_NAME).where('id', id);
    return new Passenger(result);
  };

  static async create(body) {
    const createdResult = await knex(Passenger.TABLE_NAME).insert(body);

    if (createdResult) {
      return await Passenger.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(Passenger.TABLE_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return await Passenger.findById(id);
    };

    return Passenger.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(Passenger.TABLE_NAME).where('id', id).del();
  };

};

module.exports.Passenger = Passenger;

Passenger.createTable();