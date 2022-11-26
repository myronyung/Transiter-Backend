const dynamo = require('dynamodb');
const Joi = require('joi');

const ddb = dynamo.define('Transiter_Stop_Review', {
  tableName: 'Transiter_Stop_Review',
  hashKey: 'busStop',
  rangeKey: 'stopReviewRn',
  schema: {
    stopReviewRn: Joi.string().required(),
    comment: Joi.string().min(0).max(10000).required(),
    safety: Joi.string().allow(['RED', 'ORANGE', 'GREEN']).required(),
    crowd: Joi.number().min(0).max(100).required(),
    author: Joi.string().allow('').required(),
    busNumber: Joi.string().min(0).max(3).required(),
    busStop: Joi.string().min(0).max(5).required(),
    status: Joi.string.allow(['DISPLAY', 'REMOVED'])
  },
  timestamps: true,
});

const create = (transiterReview) => {
  return ddb.create(transiterReview);
};

const update = (transiterReview) => {
  return ddb.update(transiterReview);
};

const get = async (busStop, stopReviewRn) => {
  const result = await ddb.get(busStop, stopReviewRn, {ConsistentRead: true});
  return result ? result.attrs : null;
};

const listByStop = async (busStop, filter) => {
  return search(null, busStop, '', '', '', filter);
};

const search = (index, key, search, searchType, searchKey, filters) => {
  return new Promise((resolve, reject) => {
    const query = ddb
        .query(key);

    if (index) {
      query.usingIndex(index);
    }

    if (search && search.length) {
      switch (searchType) {
        case 'beginsWith':
          query.where(searchKey).beginsWith(search);
          break;
        case 'eq':
          query.where(searchKey).eq(search);
      }
    }

    if (filters) {
      for (const filter of filters) {
        if (filter.type === 'beginsWith') {
          query.filter(filter.key).beginsWith(filter.value);
        } else if (filter.type === 'eq') {
          query.filter(filter.key).eq(filter.value);
        } else if (filter.type === 'contains') {
          query.filter(filter.key).contains(filter.value);
        }
      }
    }

    query.exec((err, data) => {
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

module.exports = {
  create,
  update,
  get,
  listByStop,
  listByAuthor
};
