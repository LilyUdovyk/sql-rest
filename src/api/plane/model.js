const knex = require('../../services/knex');
// const { Model } = require('../../services/models');
// const { Plane } = require('../plane');

const { Flight } = require('../flight/model');

class Plane {
  constructor(enitity) {
    this._entity = enitity;
  }

  static TABLE_NAME = "planes";

  static async createTable() {
    const hasTable = await knex.schema.hasTable(Plane.TABLE_NAME);

    if (hasTable) return;

    await knex.schema.createTable(Plane.TABLE_NAME, function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('model').notNullable();
      table.timestamps(true, true);
    });
  };

  virtuals = {
    getFlights: () => knex(Flight.TABLE_NAME).where('plane', this._entity.id),
  };

  static view (flag) {
    const baseView = {
      id: this._entity.id,
      name: this._entity.name,
      model: this._entity.model,
      flights: this.virtuals.getFlights()
    };
    
    switch (flag) {
      case 'full': {
        return {
          ...baseView,
        }
      }
      default: {
        return baseView;
      }
    };
  };

  static async findAll() {
    const result = await knex.select("*").from(Plane.TABLE_NAME);
    return result.map((el) => new Plane(el));
  };

  static async findById(id) {
    const result = await knex(Plane.TABLE_NAME).where('id', id);
    return new Plane(result);
  };

  static async create(body) {
    const createdResult = await knex(Plane.TABLE_NAME).insert(body);

    if (createdResult) {
      return await Plane.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(Plane.TABLE_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return await Plane.findById(id);
    };

    return Plane.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(Plane.TABLE_NAME).where('id', id).del();
  };
  
};

module.exports.Plane = Plane;

Plane.createTable();