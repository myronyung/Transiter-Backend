const user = require('./data/user');
const userAuth = require('./data/user_auth');

const transiterStopReview = require('./data/transiter_stop_review');
const createDatabase = require('./create_database');

module.exports = {
  user,
  userAuth,
  transiterStopReview,
  createFullyPopulatedDatabase: createDatabase.createFullyPopulatedDatabase,
};
