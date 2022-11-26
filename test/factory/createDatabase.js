const users = require('./data/user');
const userData = require('../../src/domain/user/internal/data/user_ddb');

const createUsers = async () => {
  await userData.create(users.default);
  await userData.create(users.removedUser);
};

// const createAuth = async () => {
//   await userCognitoAuth.createUser(organization.default.organizationRn, users.default.email, users.default.userRn);
// };

const createFullyPopulatedDatabase = async () => {
  await createUsers();
  // await createAuth();
};


module.exports = {
  createFullyPopulatedDatabase,
};
