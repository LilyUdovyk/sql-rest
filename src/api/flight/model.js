const knex = require('../../services/knex');
const { Model } = require('../../services/models');
const { PassengersFlights } = require('../passengers_flights/model');

class Flight extends Model {
  constructor(enitity) {
    super()
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

  methods = {
    getPassengers: () => knex.select("passengerId").from(PassengersFlights.TABLE_NAME).where('flightId', this._entity.id)
  };

  async view (flag) {
    const baseView = {
      id: this._entity.id,
      plane: this._entity.plane,
      time: this._entity.time,
    };
    
    switch (flag) {
      case 'full': {
        return {
          ...baseView,
          passengers: await this.methods.getPassengers(),
          created_at: this._entity.created_at,
          updated_at: this._entity.updated_at
        }
      }
      default: {
        return baseView;
      }
    };
  };

  static async delete(id) {
    await knex(PassengersFlights.TABLE_NAME).where('flightId', id).del()
    return await knex(Flight.TABLE_NAME).where('id', id).del();
  };

};

module.exports.Flight = Flight;

Flight.createTable();