const knex = require('../../services/knex');

class Model {
  constructor(enitity) {
    this._entity = enitity;
  }

  static MODEL_NAME;

  static async findAll() {
    const result = await knex.select("*").from(Model.MODEL_NAME);
    return result.map((el) => new Model(el));
  };

  static async findById(id) {
    return knex(Model.MODEL_NAME).where('id', id);
  };

  static async create(body) {
    const createdResult = await knex(Model.MODEL_NAME).insert(body);

    if (createdResult) {
      return Model.findById(createdResult[0]);
    };

    return null
  };

  static async updateById(id, fields) {
    const updatedResult = await knex(Model.MODEL_NAME).where('id', id).update(fields);

    if (updatedResult) {
      return Model.findById(id);
    };

    return Model.findById(this._entity.id);
  };

  static async delete(id) {
    return await knex(Model.MODEL_NAME).where('id', id).del();
  };
};

module.exports.Model = Model;