const knex = require('../../services/knex');
// const { Model } = require('../../services/models');

class Passengers_Flights {
  constructor(enitity) {
    this._entity = enitity;
  }

  static MODEL_NAME = "passengers_flights";

  static async createTable() {
    await knex.schema.createTableIfNotExists(Passengers_Flights.MODEL_NAME, function (table) {
      table.foreign('passengerId').references('id').inTable('passengers');
      table.foreign('flightId').references('id').inTable('flights');
    });
  };

  static async findAll() {
    const result = await knex.select("*").from(Passengers_Flights.MODEL_NAME);
    return result.map((el) => new Passengers_Flights(el));
  };

  // static async create(body) {
  //   const createdResult = await knex(Passengers_Flights.MODEL_NAME).insert(body);

  //   if (createdResult) {
  //     return Passengers_Flights.findById(createdResult[0]);
  //   };

  //   return null
  // };

  // static async updateById(id, fields) {
  //   const updatedResult = await knex(Passengers_Flights.MODEL_NAME).where('id', id).update(fields);

  //   if (updatedResult) {
  //     return Passengers_Flights.findById(id);
  //   };

  //   return Passengers_Flights.findById(this._entity.id);
  // };

  // static async delete(id) {
  //   return await knex(Passengers_Flights.MODEL_NAME).where('id', id).del();
  // };
};

module.exports.Passengers_Flights = Passengers_Flights;

Passengers_Flights.createTable();
