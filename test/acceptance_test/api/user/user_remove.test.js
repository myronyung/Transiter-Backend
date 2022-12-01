require('../../../mocks/setup');

const faker = require('faker')
const controller = require('../../../../src/controller/api/user/user_remove');
const {databases} = require('../../../mocks');
const factory = require('../../../factory');

describe('User remove', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
    jest.clearAllMocks();
  });

  test('succesfully', async () => {
    const pathParam = {
      userName: factory.user.default.userName,
      userRn: factory.user.default.userRn,
    };
    const body = {
      password: factory.userAuth.default.password,
    }

    const result = await controller.api(body, pathParam);
    expect(result).not.toBeNull();

    const userData = await databases.userData.get(result.userName, result.userRn);
    expect(userData).not.toBeNull();
    expect(userData.status).toBe('REMOVED');

    const userAuthData = await databases.userAuthData.get(result.userName, result.userRn);
    expect(userAuthData).toBeNull();
  });


  describe('fails', () => {
    test('user not found', async () => {
      const pathParam = {
        userName: faker.internet.userName(),
        userRn: faker.datatype.uuid(),
      };
      const body = {
        password: factory.userAuth.default.password,
      }

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
