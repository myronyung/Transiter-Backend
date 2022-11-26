const user = require('./data/user');
const transiterStopReview = require('./data/transiter_stop_review');
const createDatabase = require('./create_database');

module.exports = {
  user,
  transiterStopReview,
  createFullyPopulatedDatabase: createDatabase.createFullyPopulatedDatabase,
};
