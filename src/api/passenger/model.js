
const knex = require('../../services/knex');
const { Model } = require('../../services/models');
const { PassengersFlights } = require('../passengers_flights/model');

class Passenger extends Model {
  constructor(enitity) {
    super()
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
  
  methods = {
    getFlights: () => knex.select("flightId").from(PassengersFlights.TABLE_NAME).where('passengerId', this._entity.id)
  }

  async view (flag) {
    const baseView = {
      id: this._entity.id,
      fullName: this.fullName,
      country: this._entity.country,
    };
    
    switch (flag) {
      case 'full': {
        return {
          ...baseView,
          flights: await this.methods.getFlights(),
          created_at: this._entity.created_at,
          updated_at: this._entity.updated_at
        }
      }
      default: {
        return baseView;
      }
    };
  };

  static async updateById(id, fields) {
    if (typeof fields['flight'] !== "undefined") {
      const isFlight = await knex(PassengersFlights.TABLE_NAME)
        .where({ passengerId: id, flightId: fields['flight'] })
      if (!isFlight.length) {
        await knex(PassengersFlights.TABLE_NAME)
          .insert({passengerId: id, flightId: fields['flight']});
      }
      delete fields['flight']
    }

    const updatedResult = await knex(Passenger.TABLE_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return await Passenger.findById(id);
    };

    return Passenger.findById(this._entity.id);
  };

  static async delete(id) {
    await knex(PassengersFlights.TABLE_NAME).where('passengerId', id).del()
    return await knex(Passenger.TABLE_NAME).where('id', id).del();
  };

};

Object.defineProperty(Passenger.prototype, 'fullName', {
  get: function () { 
    return `${this._entity.firstName} ${this._entity.lastName}` 
  },
  set: function (fullName) {
    let split = fullName.split(' ');
    this._entity.firstName = split[0];
    this._entity.lastName = split[1];
  }
});

module.exports.Passenger = Passenger;

Passenger.createTable();