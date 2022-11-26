require('../../../../../mocks/setup');

const controller = require('../../../../../../src/controller/api/transiter/stop_review/query/transiter_stop_review_list')
const factory = require('../../../../../factory');

describe('Stop review list', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
  });

  test('succesfully', async () => {
    const pathParam = {
      busStop: factory.transiterStopReview.default.busStop,
    }

    const result = await controller.api(null, pathParam);
    expect(result).not.toBeNull();
    expect(result.list.length).toBe(2);
  });
});
