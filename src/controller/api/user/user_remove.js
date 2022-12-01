const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const userRn = pathParam.userRn;
  const userName = pathParam.userName;
  const password = body.password;

  const userAuth = await userService.userAuth.auth(userName,userRn, password);

  var user;
  if (userAuth.authorized) {
    user = await userService.user.remove(userName, userRn);
    await userService.userAuth.remove(userName, userRn);
  } else {
    user = await userService.user.get(userName, userRn);
  }

  return user;
};

exports.pathParamSchema =
  Joi.object().keys({
    userRn: Joi.string().email().required(),
    userName: Joi.string().min(1).max(30).required(),
  }).required();

  exports.bodySchema =
  Joi.object().keys({
    password: Joi.string().min(1).max(30).required(),
  }).required();