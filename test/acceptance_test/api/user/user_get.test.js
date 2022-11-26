require('../../../mocks/setup');

const faker = require('faker')
const controller = require('../../../../src/controller/api/user/user_get');
const factory = require('../../../factory');

describe('User get', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
  });

  test('succesfully', async () => {
    const pathParam = {
      userRn: factory.user.default.userRn,
    };

    const result = await controller.api(null, pathParam);
    expect(result).not.toBeNull();
    expect(result).toStrictEqual(factory.user.default);
  });


  describe('fails', () => {
    test('user not found', async () => {
      const pathParam = {
        userRn: faker.datatype.uuid(),
      };
      try {
        await controller.api(null, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('user_not_found');
        expect(e.errorCode).toBe(404);
      }
    });

    test('user removed', async () => {
      const pathParam = {
        userRn: factory.user.removedUser.userRn,
      };
      try {
        await controller.api(null, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('user_removed');
        expect(e.errorCode).toBe(404);
      }
    });
  });
});
