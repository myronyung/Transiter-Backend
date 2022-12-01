require('../../../mocks/setup');

const controller = require('../../../../src/controller/api/user/user_create')
const {databases} = require('../../../mocks');
const factory = require('../../../factory');
const faker = require('faker');

describe('User create', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
    jest.clearAllMocks();
  });

  test('succesfully', async () => {
    const body = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      password: faker.internet.userName(),
    };

    const result = await controller.api(body);
    expect(result).not.toBeNull();

    const userData = await databases.userData.get(result.userName, result.userRn);
    expect(userData).not.toBeNull();
  });

  describe('fails', () => {
    test('username is already in use', async () => {
      const body = {
        email:  faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: factory.user.default.userName,
        password: faker.internet.userName(),
      };
      try {
        await controller.api(body);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('userName_already_active');
        expect(e.errorCode).toBe(404);
      }
    });
    test('email is already in use', async () => {
      const body = {
        email: factory.user.default.email,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        password: faker.internet.userName(),
      };
      try {
        await controller.api(body);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('email_already_active');
        expect(e.errorCode).toBe(404);
      }
    });
  });
});
