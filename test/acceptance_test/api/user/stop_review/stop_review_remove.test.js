require('../../../../mocks/setup');

const controller = require('../../../../../src/controller/api/transiter/stop_review/transiter_stop_review_remove')
const {databases} = require('../../../../mocks');
const factory = require('../../../../factory');
const faker = require('faker');

describe('Stop review remove', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
  });

  test('succesfully', async () => {
    const pathParam = {
      busStop: factory.transiterStopReview.default.busStop,
      stopReviewRn: factory.transiterStopReview.default.stopReviewRn,
    }

    const result = await controller.api(null, pathParam);
    expect(result).not.toBeNull();

    const stopReview = await databases.transiterStopReviewData.get(result.busStop, result.stopReviewRn);
    expect(stopReview).not.toBeNull();
    expect(stopReview.status).toBe('REMOVED');
  });

  describe('fails', () => {
    test('review not found', async () => {
      const pathParam = {
        busStop: factory.transiterStopReview.default.busStop,
        stopReviewRn: faker.datatype.uuid(),
      }

      try {
        await controller.api(null, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('review_not_found');
        expect(e.errorCode).toBe(404);
      }
    });
    test('review already removed', async () => {
      const pathParam = {
        busStop: factory.transiterStopReview.removed.busStop,
        stopReviewRn: factory.transiterStopReview.removed.stopReviewRn
      }

      try {
        await controller.api(null, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('review_already_removed');
        expect(e.errorCode).toBe(404);
      }
    });
  });
});
