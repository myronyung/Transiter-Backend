const transiterReviewService = require('../../../../../domain/transiter_review/transiter_review_service');
const Joi = require('joi');

exports.api = async (body, pathParam, queryParam, requester) => {
  const busStop = pathParam.busStop;
  const author = pathParam.author;

  const transiterReviewList = await transiterReviewService.stopReview.list.author(busStop, author);

  return {
    transiterReviewList,
  };
};

exports.bodySchema =
  Joi.object().keys({
    author: Joi.string().required(),
  }).required();

exports.pathParamSchema =
  Joi.object().keys({
    busStop: Joi.string().min(0).max(5).required()
  }).required();
