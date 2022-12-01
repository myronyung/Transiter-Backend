const userDataDdb = require('./data/user_ddb');
const {userRnGenerator} = require('../../../util/rn_generator')

const createUser = async (email, firstName, lastName, userName, password) => {
  const exisitingUserNames = await userDataDdb.getByUserName(userName);
  if (exisitingUserNames.list.some((x) => x.status === 'ACTIVE')) {
    throw {errorCode: 404, message: 'userName_already_active'};
  }

  const existingEmails = await userDataDdb.getByEmail(email);
  if (existingEmails.list.some((x) => x.status === 'ACTIVE')) {
    throw {errorCode: 404, message: 'email_already_active'};
  }

  const userRn = userRnGenerator();
  const newUser = {
    userRn,
    userName,
    email,
    firstName,
    lastName,
    status: 'ACTIVE',
  };

  await userDataDdb.create(newUser);

  return newUser;
};

const getUser = async (userName, userRn) => {
  const user = await userDataDdb.get(userName, userRn);
  if (!user) {
    throw {errorCode: 404, message: 'user_not_found'};
  }

  if (user.status !== 'ACTIVE') {
    throw {errorCode: 404, message: 'user_removed'};

  }

  return user;
}

const updateUser = async (userRn, userName, firstName, lastName, email) => {
  const user = await getUser(userName, userRn);

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;

  await userDataDdb.update(user);

  return user;
}

const removeUser = async (userName, userRn) => {
  const user = await getUser(userName, userRn);

  user.status = 'REMOVED';
  await userDataDdb.update(user);
  
  return user;
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  removeUser,
};
