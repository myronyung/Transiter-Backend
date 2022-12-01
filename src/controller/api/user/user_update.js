const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const userRn = pathParam.userRn;
  const userName = pathParam.userName;
  const lastName = body.lastName;
  const firstName = body.firstName;
  const email = body.email;
  const password = body.password;

  const userAuth = await userService.userAuth.auth(userName,userRn, password);

  var user;
  if (userAuth.authorized) {
    user = await userService.user.update(userRn, userName, firstName, lastName, email);
  } else {
    user = await userService.user.get(userName, userRn);
  }

  return user;
};

exports.pathParamSchema =
  Joi.object().keys({
    userRn: Joi.string().email().required(),
    userName: Joi.string().email().required(),
  }).required();

exports.bodySchema =
  Joi.object().keys({
    lastName: Joi.string().min(1).max(30),
    firstName: Joi.string().min(1).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(1).max(30).required(),
  }).required();
