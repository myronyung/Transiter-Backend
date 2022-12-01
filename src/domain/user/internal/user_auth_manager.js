const { userAuthData } = require('../../../../test/mocks/dynamodb/databases');
const userDataAuthDdb = require('./data/user_auth_ddb');

const createUserAuth = async (userName, userRn, password) => {
  const existingUserAuth = await userDataAuthDdb.get(userName, userRn);
  if (existingUserAuth) {
    throw {errorCode: 404, message: 'account_already_exists'};
  }

  const newUser = {
    userName,
    userRn,
    password,
  };

  await userDataAuthDdb.create(newUser);

  return newUser;
};

const authUser = async (userName, userRn, password) => {
  const userAuth = await userAuthData.get(userName, userRn);
  if (!userAuth) {
    throw {errorCode: 404, message: 'user_not_found'};
  }

  return {
    authorized: userAuth.password === password ? true : false,
    userName,
    userRn,
  }
}

const updatePassword = async (userName, userRn, newPassword) => {
  const userAuth = await userAuthData.get(userName, userRn);
  if (!userAuth) {
    throw {errorCode: 404, message: 'user_not_found'};
  }
  
  userAuth.password = newPassword;

  await userAuthData.update(userAuth);

  return userAuth;
}

const removeUserAuth = async (userName, userRn) => {
  const userAuth = await userDataAuthDdb.remove(userName, userRn);
  
  return userAuth;
}

module.exports = {
  createUserAuth,
  authUser,
  removeUserAuth,
  updatePassword,
};
