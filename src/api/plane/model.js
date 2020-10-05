const knex = require('../../services/knex');
const { Model } = require('../../services/models');
const { Flight } = require('../flight/model');

class Plane extends Model {
  constructor(enitity) {
    super()
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
    getFlightsAmount: () => {
      const flights = this.virtuals.getFlights();
      return flights.length ? flights.length : 0
    }
  };

  async view (flag) {
    const baseView = {
      id: this._entity.id,
      name: this._entity.name,
      model: this._entity.model,
      flights: await this.virtuals.getFlights()
    };
    
    switch (flag) {
      case 'full': {
        return {
          ...baseView,
          flightsAmount: await this.virtuals.getFlightsAmount(),
          created_at: this._entity.created_at,
          updated_at: this._entity.updated_at
        }
      }
      default: {
        return baseView;
      }
    };
  };
};

module.exports.Plane = Plane;

Plane.createTable();