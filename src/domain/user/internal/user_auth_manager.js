const userDataAuthDdb = require('./data/user_auth_ddb');

const createUserAuth = async (userName, userRn, password) => {
  const existingUserAuth = await userDataAuthDdb.get(userName);
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

const authUser = async (userName, password) => {
  const userAuth = await userDataAuthDdb.get(userName);
  if (!userAuth) {
    throw {errorCode: 404, message: 'user_not_found'};
  }

  return {
    authorized: userAuth.password === password ? true : false,
    userName: userAuth.userName,
    userRn: userAuth.userRn,
  };
};

const updatePassword = async (userName, newPassword) => {
  const userAuth = await userDataAuthDdb.get(userName);
  if (!userAuth) {
    throw {errorCode: 404, message: 'user_not_found'};
  }
  
  userAuth.password = newPassword;

  await userDataAuthDdb.update(userAuth);

  return userAuth;
};

const removeUserAuth = async (userName) => {
  const userAuth = await userDataAuthDdb.remove(userName);
  
  return userAuth;
};

module.exports = {
  createUserAuth,
  authUser,
  removeUserAuth,
  updatePassword,
  getUserAuth: userDataAuthDdb.get,
};
