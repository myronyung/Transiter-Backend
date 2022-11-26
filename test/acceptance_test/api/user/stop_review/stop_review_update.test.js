require('../../../../mocks/setup');

const controller = require('../../../../../src/controller/api/transiter/stop_review/transiter_stop_review_update')
const {databases} = require('../../../../mocks');
const factory = require('../../../../factory');
const faker = require('faker');

describe('Stop review update', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
  });

  describe('succesfully',  () => {
    test('update stop review', async () => {
      const body = {
        comment: faker.lorem.words(100).substring(0, 100),
        safety: faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
        crowd: faker.datatype.number({min: 0, max: 100}),
        authorRn: factory.user.default.userRn,
      };
      const pathParam = {
        busStop: factory.transiterStopReview.default.busStop,
        stopReviewRn: factory.transiterStopReview.default.stopReviewRn,
      }
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const stopReview = await databases.transiterStopReviewData.get(result.busStop, result.stopReviewRn);
      expect(stopReview).not.toBeNull();
      expect(stopReview.comment).toBe(body.comment);
      expect(stopReview.safety).toBe(body.safety);
      expect(stopReview.crowd).toBe(body.crowd);
    });

    test('update stop review with no new details', async () => {
      const body = {
        authorRn: factory.user.default.userRn,
      };
      const pathParam = {
        busStop: factory.transiterStopReview.default.busStop,
        stopReviewRn: factory.transiterStopReview.default.stopReviewRn,
      }
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const stopReview = await databases.transiterStopReviewData.get(result.busStop, result.stopReviewRn);
      expect(stopReview).not.toBeNull();
    });
  })

  describe('fails', () => {
    test('user not found', async () => {
      const body = {
        comment: faker.lorem.words(100).substring(0, 100),
        safety: faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
        crowd: faker.datatype.number({min: 0, max: 100}),
        authorRn: faker.datatype.uuid(),
      };
      const pathParam = {
        busStop: factory.transiterStopReview.default.busStop,
        stopReviewRn: factory.transiterStopReview.default.stopReviewRn,
      }

      try {
        await controller.api(body, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('user_not_found');
        expect(e.errorCode).toBe(404);
      }
    });
    test('review not found', async () => {
      const body = {
        comment: faker.lorem.words(100),
        safety: faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
        crowd: faker.datatype.number({min: 0, max: 100}),
        authorRn: factory.user.default.userRn,
      };
      const pathParam = {
        busStop: factory.transiterStopReview.default.busStop,
        stopReviewRn: faker.datatype.uuid(),
      }

      try {
        await controller.api(body, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('review_not_found');
        expect(e.errorCode).toBe(404);
      }
    });
    test('review removed', async () => {
      const body = {
        comment: faker.lorem.words(100),
        safety: faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
        crowd: faker.datatype.number({min: 0, max: 100}),
        authorRn: factory.user.default.userRn,
      };
      const pathParam = {
        busStop: factory.transiterStopReview.removed.busStop,
        stopReviewRn: factory.transiterStopReview.removed.stopReviewRn
      }

      try {
        await controller.api(body, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('review_removed');
        expect(e.errorCode).toBe(404);
      }
    });
  });
});
