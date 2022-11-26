const transiterStopReviewManager = require('./internal/transiter_stop_review_manager')
const transiterBusReviewManager = require('./internal/transiter_bus_review_manager')

module.exports = {
    stopReview: {
        create: transiterStopReviewManager.createReview,
        anonymousCreate: transiterStopReviewManager.createAnonymousReview,
        update: transiterStopReviewManager.updateReview,
        remove: transiterStopReviewManager.removeReview,

        list: {
            busStop: transiterStopReviewManager.listReviewsByStop,
        }
    },

    busReview: {

    }
};
