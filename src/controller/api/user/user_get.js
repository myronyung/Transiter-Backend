const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const userRn = pathParam.userRn
  const userName = pathParam.userName

  const user = await userService.user.get(userName, userRn);

  return user;
};

exports.pathParamSchema =
  Joi.object().keys({
    userRn: Joi.string().required(),
    userName: Joi.string().min(1).max(30).required(),
  }).required();
