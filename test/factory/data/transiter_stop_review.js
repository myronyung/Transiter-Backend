const faker = require('faker');
const {stopReviewRnGenerator} = require('../../../src/util/rn_generator');
const {userNameGenerator} = require('../../../src/util/user_name_generator');
const user = require('./user')

const stopReview = {
  'createdAt': '2021-09-07T03:28:35.025Z',
  'stopReviewRn': stopReviewRnGenerator(),
  'comment': faker.lorem.words(100).substring(0, 100),
  'safety': faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
  'crowd': faker.datatype.number({min: 0, max: 100}),
  'author': {
    'rn': user.default.userRn,
    'userName': userNameGenerator(user.default)
  },
  'bus': 'R5',
  'busStop': '51374',
  'status': 'DISPLAY',
};

const stopReview2 = {
  'createdAt': '2021-09-07T03:28:35.025Z',
  'stopReviewRn': stopReviewRnGenerator(),
  'comment': faker.lorem.words(100).substring(0, 100),
  'safety': faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
  'crowd': faker.datatype.number({min: 0, max: 100}),
  'author': {
    'rn': user.default.userRn,
    'userName': userNameGenerator(user.default),
  },
  'bus': 'R5',
  'busStop': '51374',
  'status': 'DISPLAY',
};

const stopReviewRemoved = {
  'createdAt': '2021-09-07T03:28:35.025Z',
  'stopReviewRn': stopReviewRnGenerator(),
  'comment': faker.lorem.words(100).substring(0, 100),
  'safety': faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
  'crowd': faker.datatype.number({min: 0, max: 100}),
  'author': {
    'rn': user.default.userRn,
    'userName': userNameGenerator(user.default),
  },
  'bus': faker.random.arrayElement(['143', '144', '145', 'R5']),
  'busStop': faker.datatype.number({min: 1000, max: 2000}).toString(),
  'status': 'REMOVED',
};

const stopReviewAnonymous = {
  'createdAt': '2021-09-07T03:28:35.025Z',
  'stopReviewRn': stopReviewRnGenerator(),
  'comment': faker.lorem.words(100).substring(0, 100),
  'safety': faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
  'crowd': faker.datatype.number({min: 0, max: 100}),
  'author': {
    'rn': 'ANONYMOUS',
    'userName': 'ANONYMOUS',
  },
  'bus': faker.random.arrayElement(['143', '144', '145', 'R5']),
  'busStop': faker.datatype.number({min: 1000, max: 2000}).toString(),
  'status': 'DISPLAY',
};

module.exports = {
  default: stopReview,
  default2: stopReview2,
  removed: stopReviewRemoved,
  anonymous: stopReviewAnonymous,
};
