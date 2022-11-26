const user = require('./data/user');
const createDatabase = require('./createDatabase');

module.exports = {
  user,
  createFullyPopulatedDatabase: createDatabase.createFullyPopulatedDatabase,
};
