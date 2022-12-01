const dynamo = require('dynamodb');
const Joi = require('joi');

const ddb = dynamo.define('Transiter_User_Auth', {
  tableName: 'Transiter_User_Auth',
  hashKey: 'userName',
  rangeKey: 'userRn',
  schema: {
    userName: Joi.string().min(1).max(30).required(),
    userRn: Joi.string().required(),
    password: Joi.string().min(1).max(30).required(),
  },
  timestamps: true,
});

const create = (user) => {
  return ddb.create(user);
};

const get = async (userName, userRn) => {
  const result = await ddb.get(userName, userRn, {ConsistentRead: true});
  return result ? result.attrs : null;
};

const update = (user) => {
  return ddb.update(user);
};

const remove = (userName, userRn) => {
  return ddb.destroy(userName, userRn);
};

module.exports = {
  create,
  get,
  update,
  remove,
};

