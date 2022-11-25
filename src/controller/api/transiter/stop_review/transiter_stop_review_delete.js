const transiterReviewService = require('../../../../domain/transiter_review/transiter_review_service');
const Joi = require('joi');

exports.api = async (body, pathParam, queryParam, requester) => {
  const busStop = pathParam.busStop;
  const stopReviewRn = pathParam.stopReviewRn;

  const transiterReview = await transiterReviewService.stopReview.remove(busStop, stopReviewRn);

  return {
    transiterReview,
  };
};

exports.pathParamSchema =
  Joi.object().keys({
    busStop: Joi.string().min(0).max(5).required(),
    stopReviewRn: Joi.string().required(),
  }).required();
