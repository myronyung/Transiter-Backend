const faker = require('faker');
const {userRnGenerator} = require('../../../src/util/rn_generator');

const defaultUser = {
  'createdAt': '2021-09-07T03:28:35.025Z',
  'userRn': userRnGenerator(),
  'email': faker.internet.email(),
  'firstName': faker.name.firstName(),
  'lastName': faker.name.lastName(),
  'status': 'ACTIVE',
};

const removedUser = {
  'createdAt': '2021-09-20T01:34:22.420Z',
  'userRn': userRnGenerator(),
  'email': faker.internet.email(),
  'firstName': faker.name.firstName(),
  'lastName': faker.name.lastName(),
  'status': 'REMOVED',
};

module.exports = {
  default: defaultUser,
  removedUser,
};
