const transiterStopReviewDdb = require('./data/transiter_stop_review_ddb');
const userService = require('../../user/user_service')
const {stopReviewRnGenerator} = require('../../util/rn_generator');

const createReview = async (busStop, bus, comment, safety, crowd, author) => {
    const author = userService.user.get(author.rn)
    if (author.status != 'ACTIVE') {
      throw {errorCode: 404, message: 'user_not_found'};
    }

    const stopReview = {
        stopReviewRn: stopReviewRnGenerator(),
        busStop,
        bus,
        comment,
        safety,
        crowd,
        author,
    }

    await transiterStopReviewDdb.create(stopReview)

    return stopReview
}

const updateReview = async (busStop, stopReviewRn, comment, safety, crowd) => {
    const stopReview = await transiterStopReviewDdb.get(busStop, stopReviewRn);
    if (!stopReview) {
      throw {errorCode: 404, message: 'review_not_found'};
    }

    if (stopReview.status === 'REMOVED') {
      throw {errorCode: 404, message: 'review_removed'};
        
    }

    stopReview.comment = comment || stopReview.comment
    stopReview.safety = safety || stopReview.safety
    stopReview.crowd = crowd || stopReview.crowd

    await transiterStopReviewDdb.update(stopReview)
    
    return stopReview
}

const removeReview = async (busStop, stopReviewRn) => {
    const stopReview = await transiterStopReviewDdb.get(busStop, stopReviewRn);
    if (!stopReview) {
      throw {errorCode: 404, message: 'review_not_found'};
    }

    stopReview.status = 'REMOVED'
    await transiterStopReviewDdb.update(stopReview)

    return stopReview
}

const listReviewsByStop = async (busStop) => {
  return transiterStopReviewDdb.listByStop(busStop, [{type: 'eq', key: 'status', value: status}])
}

const listReviewsByAuthor = async (busStop) => {
  return transiterStopReviewDdb.listByAuthor(busStop, [{type: 'eq', key: 'status', value: status}])
}

module.exports = {
    createReview,
    getReview: transiterStopReviewDdb.get,
    removeReview,
    updateReview,
    listReviewsByStop,
    listReviewsByAuthor,
}
