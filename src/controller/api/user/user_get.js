const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const userRn = pathParam.userRn

  const user = await userService.user.get(userRn);

  return user;
};

exports.pathParamSchema =
  Joi.object().keys({
    userRn: Joi.string().email().required(),
  }).required();
