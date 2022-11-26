const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const userRn = pathParam.userRn
  const lastName = body.lastName
  const firstName = body.firstName
  const email = body.email

  const user = await userService.user.update(userRn, firstName, lastName, email);

  return user;
};

exports.pathParamSchema =
  Joi.object().keys({
    userRn: Joi.string().email().required(),
  }).required();

exports.bodySchema =
  Joi.object().keys({
    lastName: Joi.string().min(1).max(30).required(),
    firstName: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
  }).required();
