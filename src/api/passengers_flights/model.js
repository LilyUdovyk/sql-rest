const knex = require('../../services/knex');
// const { Model } = require('../../services/models');

class PassengersFlights {
  constructor(enitity) {
    this._entity = enitity;
  }

  static TABLE_NAME = "passengers_flights";

  static async createTable() {
    const hasTable = await knex.schema.hasTable(PassengersFlights.TABLE_NAME);

    if (hasTable) return;

    await knex.schema.createTable(PassengersFlights.TABLE_NAME, function (table) {
      table.integer('passengerId').unsigned();
      table.integer('flightId').unsigned();

      table.foreign('passengerId').references('passengers.id');
      table.foreign('flightId').references('flights.id');
    });
  };

  static async findAll() {
    const result = await knex.select("*").from(PassengersFlights.TABLE_NAME);
    return result.map((el) => new PassengersFlights(el));
  };

};

module.exports.PassengersFlights = PassengersFlights;

PassengersFlights.createTable();
