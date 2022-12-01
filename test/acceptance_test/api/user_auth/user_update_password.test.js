require('../../../mocks/setup');

const controller = require('../../../../src/controller/api/user_auth/user_update_password');
const {databases} = require('../../../mocks');
const factory = require('../../../factory');
const faker = require('faker');

describe('User password reset', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
    jest.clearAllMocks();
  });

  describe('succesfully', () => {
    test('update user password', async () => {
      const pathParam = {
        userName: factory.user.default.userName,
        userRn: factory.user.default.userRn,
      };
      const body = {
        password: factory.userAuth.default.password,
        newPassword: faker.internet.userName(),
      };
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const userAuthData = await databases.userAuthData.get(result.userName, result.userRn);
      expect(userAuthData).not.toBeNull();
      expect(userAuthData.password).toBe(body.newPassword);
    });

    test('user password not updated', async () => {
      const pathParam = {
        userName: factory.user.default.userName,
        userRn: factory.user.default.userRn,
      };
      const body = {
        password: faker.internet.userName(),
        newPassword: faker.internet.userName(),
      };
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const userAuthData = await databases.userAuthData.get(result.userName, result.userRn);
      expect(userAuthData).not.toBeNull();
      expect(userAuthData.password).toBe(factory.userAuth.default.password);
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
