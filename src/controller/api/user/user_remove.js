const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const userName = pathParam.userName;
  const password = body.password;

  const userAuth = await userService.userAuth.auth(userName, password);

  var user;
  if (userAuth.authorized) {
    user = await userService.user.remove(userName, userAuth.userRn);
    await userService.userAuth.remove(userName);
  } else {
    user = await userService.user.get(userName, userAuth.userRn);
  }

  return user;
};

exports.pathParamSchema =
  Joi.object().keys({
    userName: Joi.string().min(1).max(30).required(),
  }).required();

  exports.bodySchema =
  Joi.object().keys({
    password: Joi.string().min(1).max(30).required(),
  }).required();