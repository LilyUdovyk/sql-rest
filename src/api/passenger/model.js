const knex = require("knex");

module.exports.Passenger = class Passenger {
  constructor(enitity) {
    this._entity = enitity;
  }

  async save(fields) {
    const updatedResult = await knex(Passenger.MODEL_NAME).where("id", "=", this._entity.id).update(fields);

    if (updatedResult) {
      return updatedResult
    }

    return Passenger.findById(this._entity.id);
  }

  static MODEL_NAME = "passenger";

  static async find() {
    const result = await knex.select("firstName").from(Passenger.MODEL_NAME);
    // [{ id: 1, firstName: 'User }]
    return result.map((el) => new Passenger(el));
  }
};

const MODEL_NAME = 'passenger';

module.exports.Passenger = {
  updateById({ id, body }) {
    return knex(MODEL_NAME).where("id", "=", id).update(body);
  }
}