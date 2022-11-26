require('../../../mocks/setup');

const faker = require('faker')
const controller = require('../../../../src/controller/api/user/user_remove');
const {databases} = require('../../../mocks');
const factory = require('../../../factory');

describe('User remove', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
  });

  test('succesfully', async () => {
    const pathParam = {
      userRn: factory.user.default.userRn,
    };

    const result = await controller.api(null, pathParam);
    expect(result).not.toBeNull();

    const userData = await databases.userData.get(result.userRn);
    expect(userData).not.toBeNull();
    expect(userData.status).toBe('REMOVED');
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

    test('user already removed', async () => {
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
