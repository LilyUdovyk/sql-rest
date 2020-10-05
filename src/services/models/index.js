const knex = require('../../services/knex');

class Model {
  constructor(enitity) {
    this._entity = enitity;
  }

  static TABLE_NAME;

  static async findAll() {
    const result = await knex.select("*").from(this.TABLE_NAME);
    return result.map((el) => new this(el));
  };

  static async findById(id) {
    const result = await knex(this.TABLE_NAME).where('id', id);
    return result.length ? new this(result[0]) : null;
  };

  static async create(body) {
    const createdResult = await knex(this.TABLE_NAME).insert(body);

    if (createdResult) {
      return await this.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(this.TABLE_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return await this.findById(id);
    };

    return this.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(this.TABLE_NAME).where('id', id).del();
  };

};

module.exports.Model = Model;