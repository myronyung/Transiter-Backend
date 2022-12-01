const transiterReviewService = require('../../../../domain/transiter_review/transiter_review_service');
const Joi = require('joi');

exports.api = async (body, pathParam, queryParam, requester) => {
  const busStop = pathParam.busStop;
  const bus = body.bus;
  const comment = body.comment || '';
  const safety = body.safety;
  const crowd = body.crowd;
  const authorRn = body.authorRn;
  const userName = body.userName;

  var transiterReview;
  if (authorRn && userName) {
    transiterReview = await transiterReviewService.stopReview.create(busStop, bus, comment, safety, crowd, authorRn, userName);
  } else {
    transiterReview = await transiterReviewService.stopReview.anonymousCreate(busStop, bus, comment, safety, crowd);
  }

  return transiterReview;
};

exports.bodySchema =
  Joi.object().keys({
    bus: Joi.string().allow('143', '144', '145', 'R5').required(),
    comment: Joi.string().min(0).max(180),
    safety: Joi.string().allow('RED', 'ORANGE', 'GREEN').required(),
    crowd: Joi.number().min(0).max(100).required(),
    authorRn: Joi.string(),
    userName: Joi.string(),
  }).required();

exports.pathParamSchema =
  Joi.object().keys({
    busStop: Joi.string().min(0).max(5).required()
  }).required();
