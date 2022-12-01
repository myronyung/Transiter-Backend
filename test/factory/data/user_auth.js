const faker = require('faker');
const user = require('./user')

const defaultUserAuth = {
  'createdAt': '2021-09-07T03:28:35.025Z',
  'userRn': user.default.userRn,
  'userName': user.default.userName,
  'password': faker.internet.userName(),
};

module.exports = {
  default: defaultUserAuth,
};
