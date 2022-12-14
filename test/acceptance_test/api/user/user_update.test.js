require('../../../mocks/setup');

const controller = require('../../../../src/controller/api/user/user_update');
const {databases} = require('../../../mocks');
const factory = require('../../../factory');
const faker = require('faker');

describe('User update', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
    jest.clearAllMocks();
  });

  describe('succesfully', () => {
    test('update user details', async () => {
      const pathParam = {
        userName: factory.user.default.userName,
        userRn: factory.user.default.userRn,
      };
      const body = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: factory.userAuth.default.password
      };
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const userData = await databases.userData.get(result.userName, result.userRn);
      expect(userData).not.toBeNull();
      expect(userData.firstName).toBe(body.firstName);
      expect(userData.lastName).toBe(body.lastName);
      expect(userData.email).toBe(body.email);
    });

    test('update with no new user details', async () => {
      const pathParam = {
        userName: factory.user.default.userName,
        userRn: factory.user.default.userRn,
      };
      const body = {
        password: factory.userAuth.default.password
      };
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const userData = await databases.userData.get(result.userName, result.userRn);
      expect(userData).not.toBeNull();

      const defaultUser = factory.user.default
      expect(userData.firstName).toBe(defaultUser.firstName);
      expect(userData.lastName).toBe(defaultUser.lastName);
      expect(userData.email).toBe(defaultUser.email);
    });
  })
  
  describe('fails', () => {
    test('user not found', async () => {
      const pathParam = {
        userName: faker.internet.userName(),
        userRn: faker.datatype.uuid(),
      };
      const body = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
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
