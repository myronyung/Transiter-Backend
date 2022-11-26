const dynamo = require('dynamodb');
const Joi = require('joi');

const ddb = dynamo.define('Transiter_User', {
  tableName: 'Transiter_User',
  hashKey: 'userRn',
  schema: {
    userRn: Joi.string().required(),
    email: Joi.string().email().allow('').required(),
    firstName: Joi.string().min(1).max(30).allow('').required(),
    lastName: Joi.string().min(1).max(30).required(),
    status: Joi.string().allow('ACTIVE', 'REMOVED').required(),
  },
  timestamps: true,
});

const create = (user) => {
  return ddb.create(user);
};

const get = async (userRn) => {
  const result = await ddb.get(userRn, {ConsistentRead: true});
  return result ? result.attrs : null;
};

const getbyEmail = async (email) => {
  return new Promise((resolve, reject) => {
    ddb
        .scan()
        .where('email').equals(email)
        .exec((err, data) => {
          if (err) reject(err);
          else {
            const items = data.Items.map((x) => x.attrs);
            const result = {
              list: items,
            };

            resolve(result);
          }
        });
  });
};

const update = (user) => {
  return ddb.update(user);
};

module.exports = {
  create,
  get,
  getbyEmail,
  update
};

