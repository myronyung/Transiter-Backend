const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const userName = pathParam.userName;
  const password = body.password;
  const newPassword = body.newPassword;

  const userAuth = await userService.userAuth.auth(userName, password);

  var newUserAuth;
  if (userAuth.authorized) {
    newUserAuth = await userService.userAuth.updatePassword(userName, newPassword);
  } else {
    newUserAuth = userService.userAuth.get(userName);
  }

  return newUserAuth;
};

exports.pathParamSchema =
  Joi.object().keys({
    userName: Joi.string().email().required(),
  }).required();

exports.bodySchema =
  Joi.object().keys({
    password: Joi.string().min(1).max(30).required(),
    newPassword: Joi.string().min(1).max(30).required(),
  }).required();
