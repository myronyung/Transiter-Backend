const Joi = require('joi');
const userService = require('../../../domain/user/user_service');

exports.api = async (body, pathParam, queryParam, requester) => {
  const email = body.email;
  const firstName = body.firstName;
  const lastName = body.lastName;

  const user = await userService.user.create(email, firstName, lastName);

  return user;
};

exports.bodySchema =
  Joi.object().keys({
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required(),
  }).required();
