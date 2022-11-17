const dynamo = require('dynamodb');
const Joi = require('joi');

const ddb = dynamo.define('TransiterReviewsDdb', {
  tableName: 'TransiterReviewsDdb',
  hashKey: 'reviewRn',
  schema: {
    reviewRn: Joi.string().required(),
  },
  timestamps: true,
});

const create = (transiterReview) => {
  return ddb.create(transiterReview);
};

const update = (transiterReview) => {
  return ddb.update(transiterReview);
};

const get = async (reviewRn) => {
  const result = await ddb.get(reviewRn, {ConsistentRead: true});
  return result ? result.attrs : null;
};

module.exports = {
  create,
  update,
  get,
};
