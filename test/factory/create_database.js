const users = require('./data/user');
const userData = require('../../src/domain/user/internal/data/user_ddb');
const userAuths = require('./data/user_auth');
const userAuthData = require('../../src/domain/user/internal/data/user_auth_ddb');
const transiterStopReviews = require('./data/transiter_stop_review');
const transiterStopReviewData = require('../../src/domain/transiter_review/internal/data/transiter_stop_review_ddb');

const createUsers = async () => {
  await userData.create(users.default);
  await userData.create(users.removedUser);
};

const createUserAuths = async () => {
  await userAuthData.create(userAuths.default);
};

const createStopReviews = async () => {
  await transiterStopReviewData.create(transiterStopReviews.default);
  await transiterStopReviewData.create(transiterStopReviews.default2);
  await transiterStopReviewData.create(transiterStopReviews.removed);
  await transiterStopReviewData.create(transiterStopReviews.anonymous);
};

const createFullyPopulatedDatabase = async () => {
  await createUsers();
  await createStopReviews();
  await createUserAuths();
};


module.exports = {
  createFullyPopulatedDatabase,
};
