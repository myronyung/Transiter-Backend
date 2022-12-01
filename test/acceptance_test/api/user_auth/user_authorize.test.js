require('../../../mocks/setup');

const faker = require('faker')
const controller = require('../../../../src/controller/api/user_auth/user_authorize');
const factory = require('../../../factory');

describe('User authorize', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
    jest.clearAllMocks();
  });

  describe('succesfully', () => {
    test('auth user', async () => {
      const pathParam = {
        userName: factory.user.default.userName,
        userRn: factory.user.default.userRn,
      };
  
      const body = {
        password: factory.userAuth.default.password,
      };
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
      expect(result.authorized).toBe(true);
    });
    test('not auth user', async () => {
      const pathParam = {
        userName: factory.user.default.userName,
        userRn: factory.user.default.userRn,
      };
  
      const body = {
        password: faker.internet.userName(),
      };
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
      expect(result.authorized).toBe(false);
    });
  })



  describe('fails', () => {
    test('user not found', async () => {
      const pathParam = {
        userName: faker.internet.userName(),
        userRn: faker.datatype.uuid(),
      };
      const body = {
        password: factory.userAuth.default.password,
        newPassword: faker.internet.userName(),
      };
      try {
        await controller.api(body, pathParam);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('user_not_found');
        expect(e.errorCode).toBe(404);
      }
    });
  });
});
