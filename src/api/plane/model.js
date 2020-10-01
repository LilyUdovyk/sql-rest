const knex = require('../../services/knex');
// const { Model } = require('../../services/models');

class Plane {
  constructor(enitity) {
    this._entity = enitity;
  }

  static MODEL_NAME = "planes";

  static async createTable() {
    await knex.schema.createTableIfNotExists(Plane.MODEL_NAME, function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('model').notNullable();
      // table.integer('flights').unsigned().notNullable();
      // table.foreign('flights').references('flightId').inTable('flights');
      table.timestamps(true, true);
    });
  };

  static async findAll() {
    const result = await knex.select("*").from(Plane.MODEL_NAME);
    return result.map((el) => new Plane(el));
  };

  static async findById(id) {
    return knex(Plane.MODEL_NAME).where('id', id);
  };

  static async create(body) {
    const createdResult = await knex(Plane.MODEL_NAME).insert(body);

    if (createdResult) {
      return Plane.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(Plane.MODEL_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return Plane.findById(id);
    };

    return Plane.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(Plane.MODEL_NAME).where('id', id).del();
  };
};

module.exports.Plane = Plane;

Plane.createTable();
