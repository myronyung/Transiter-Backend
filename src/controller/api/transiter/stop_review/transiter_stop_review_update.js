const transiterReviewService = require('../../../../domain/transiter_review/transiter_review_service');
const Joi = require('joi');

exports.api = async (body, pathParam, queryParam, requester) => {
  const busStop = pathParam.busStop;
  const stopReviewRn = pathParam.stopReviewRn;
  const comment = body.comment || '';
  const safety = body.safety;
  const crowd = body.crowd;
  const authorRn = body.authorRn;
  const userName = body.userName;

  const transiterReview = await transiterReviewService.stopReview.update(busStop, stopReviewRn, comment, safety, crowd, authorRn, userName);

  return transiterReview;
};

exports.bodySchema =
  Joi.object().keys({
    comment: Joi.string().min(0).max(180),
    safety: Joi.string().allow('RED', 'ORANGE', 'GREEN').required(),
    crowd: Joi.number().min(0).max(100).required(),
    authorRn: Joi.string().required(),
    userName: Joi.string().required(),
  }).required();

exports.pathParamSchema =
  Joi.object().keys({
    busStop: Joi.string().required(),
    stopReviewRn: Joi.string().required(),
  }).required();
