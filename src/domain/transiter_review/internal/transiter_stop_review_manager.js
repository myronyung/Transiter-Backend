const transiterStopReviewDdb = require('./data/transiter_stop_review_ddb');
const userService = require('../../user/user_service')
const {stopReviewRnGenerator} = require('../../../util/rn_generator');
const {userNameGenerator, anonymousGenerator} = require('../../../util/user_name_generator');

const createReview = async (busStop, bus, comment, safety, crowd, authorRn) => {
    const author = await userService.user.get(authorRn);

    const stopReview = {
        stopReviewRn: stopReviewRnGenerator(),
        busStop,
        bus,
        comment,
        safety,
        crowd,
        author: {
          rn: author.userRn,
          userName: userNameGenerator(author),
        },
        status: 'DISPLAY',
    };

    await transiterStopReviewDdb.create(stopReview);

    return stopReview;
}

const createAnonymousReview = async (busStop, bus, comment, safety, crowd) => {
  const stopReview = {
      stopReviewRn: stopReviewRnGenerator(),
      busStop,
      bus,
      comment,
      safety,
      crowd,
      author: {
        rn: 'ANONYMOUS',
        userName: anonymousGenerator(),
      },
      status: 'DISPLAY',
  };

  await transiterStopReviewDdb.create(stopReview);

  return stopReview;
}

const updateReview = async (busStop, stopReviewRn, comment, safety, crowd, authorRn) => {
  await userService.user.get(authorRn);

  const stopReview = await transiterStopReviewDdb.get(busStop, stopReviewRn);
  if (!stopReview) {
    throw {errorCode: 404, message: 'review_not_found'};
  }

  if (stopReview.status === 'REMOVED') {
    throw {errorCode: 404, message: 'review_removed'};
  }

  stopReview.comment = comment || stopReview.comment;
  stopReview.safety = safety || stopReview.safety;
  stopReview.crowd = crowd || stopReview.crowd;

  await transiterStopReviewDdb.update(stopReview);
  
  return stopReview;
}

const removeReview = async (busStop, stopReviewRn) => {
    const stopReview = await transiterStopReviewDdb.get(busStop, stopReviewRn);
    if (!stopReview) {
      throw {errorCode: 404, message: 'review_not_found'};
    }

    if (stopReview.status === 'REMOVED') {
      throw {errorCode: 404, message: 'review_already_removed'};
    }

    stopReview.status = 'REMOVED';
    await transiterStopReviewDdb.update(stopReview);

    return stopReview;
}

const listReviewsByStop = async (busStop) => {
  return transiterStopReviewDdb.listByStop(busStop, [{type: 'eq', key: 'status', value: 'DISPLAY'}]);
}

module.exports = {
    createReview,
    createAnonymousReview,
    getReview: transiterStopReviewDdb.get,
    removeReview,
    updateReview,
    listReviewsByStop,
};
