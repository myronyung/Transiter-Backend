const userDataDdb = require('./data/user_ddb');
const {userRnGenerator} = require('../../../util/rn_generator')

const createUser = async (email, firstName, lastName) => {
  const existingUsers = await userDataDdb.getbyEmail(email);
  if (existingUsers.list.some((x) => x.status === 'ACTIVE')) {
    throw {errorCode: 404, message: 'email_already_active'};
  }

  const newUser = {
    userRn: userRnGenerator(),
    email,
    firstName,
    lastName,
    status: 'ACTIVE',
  };

  await userDataDdb.create(newUser);

  return newUser;
};

const getUser = async (userRn) => {
  const user = await userDataDdb.get(userRn);
  if (!user) {
    throw {errorCode: 404, message: 'user_not_found'};
  }

  if (user.status !== 'ACTIVE') {
    throw {errorCode: 404, message: 'user_removed'};

  }

  return user;
}

const updateUser = async (userRn, firstName, lastName, email) => {
  const user = await getUser(userRn);

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;

  await userDataDdb.update(user);

  return user;
}

const removeUser = async (userRn) => {
  const user = await getUser(userRn);

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
