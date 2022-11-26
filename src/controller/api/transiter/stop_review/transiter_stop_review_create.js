const transiterReviewService = require('../../../../domain/transiter_review/transiter_review_service');
const Joi = require('joi');

exports.api = async (body, pathParam, queryParam, requester) => {
  const busStop = pathParam.busStop;
  const bus = body.bus;
  const comment = body.comment || '';
  const safety = body.safety;
  const crowd = body.crowd;
  const author = body.author;
  
  const transiterReview = await transiterReviewService.stopReview.create(busStop, bus, comment, safety, crowd, author);

  return {
    transiterReview,
  };
};

exports.bodySchema =
  Joi.object().keys({
    bus: Joi.string().min(0).max(3).required(),
    comment: Joi.string().min(0).max(180),
    safety: Joi.string().allow(['RED', 'ORANGE', 'GREEN']).required(),
    crowd: Joi.number().min(0).max(100).required(),
    author:  Joi.object().keys({
      rn: Joi.string().required(),
      userName: Joi.string().required(),
    }).required(),
  }).required();

exports.pathParamSchema =
  Joi.object().keys({
    busStop: Joi.string().min(0).max(5).required()
  }).required();