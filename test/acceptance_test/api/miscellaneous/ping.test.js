const controller = require('../../../../src/controller/api/miscellaneous/ping');

describe('Ping', () => {
  test('It pings correctly', async () => {
    await controller.api();
  });
});
