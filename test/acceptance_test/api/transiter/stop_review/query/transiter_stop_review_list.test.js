require('../../../../../mocks/setup');

const faker = require('faker');
const controller = require('../../../../../../src/controller/api/transiter/stop_review/query/transiter_stop_review_list')
const factory = require('../../../../../factory');
const {transiterStopReviewData} = require('../../../../../mocks/dynamodb/databases')

describe('Stop review list', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
    jest.clearAllMocks();
  });

  test('succesfully', async () => {
    const pathParam = {
      busStop: factory.transiterStopReview.default.busStop,
    }

    for (var i = 0; i < 3; i++) {
      await transiterStopReviewData.create({...factory.transiterStopReview.default, stopReviewRn: faker.datatype.uuid()})
    }

    const result = await controller.api(null, pathParam);
    expect(result).not.toBeNull();
    expect(result.list.length).toBe(5);
  });
});
