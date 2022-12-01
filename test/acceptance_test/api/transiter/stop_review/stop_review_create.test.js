require('../../../../mocks/setup');

const controller = require('../../../../../src/controller/api/transiter/stop_review/transiter_stop_review_create')
const {databases} = require('../../../../mocks');
const factory = require('../../../../factory');
const faker = require('faker');

describe('Stop review create', () => {
  beforeEach(async () => {
    await factory.createFullyPopulatedDatabase();
    jest.clearAllMocks();
  });

  describe('successfully', () => {
    test('create stop review with author', async () => {
      const body = {
        bus: faker.random.arrayElement(['143', '144', '145', 'R5']),
        comment: faker.lorem.words(100).substring(0, 100),
        safety: faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
        crowd: faker.datatype.number({min: 0, max: 100}),
        authorRn: factory.user.default.userRn,
        userName: factory.user.default.userName,
      };
      const pathParam = {
        busStop: faker.datatype.number({min: 1000, max: 2000}).toString()
      }
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const author = await databases.userData.get(factory.user.default.userName, factory.user.default.userRn);
  
      const stopReview = await databases.transiterStopReviewData.get(result.busStop, result.stopReviewRn);
      expect(stopReview).not.toBeNull();
      expect(stopReview.bus).toBe(body.bus);
      expect(stopReview.comment).toBe(body.comment);
      expect(stopReview.safety).toBe(body.safety);
      expect(stopReview.crowd).toBe(body.crowd);
      expect(stopReview.author).toStrictEqual({
        rn: body.authorRn,
        userName: factory.user.default.userName,
      });
    });
    test('create stop review anonymously', async () => {
      const body = {
        bus: faker.random.arrayElement(['143', '144', '145', 'R5']),
        comment: faker.lorem.words(100).substring(0, 100),
        safety: faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
        crowd: faker.datatype.number({min: 0, max: 100}),
      };
      const pathParam = {
        busStop: faker.datatype.number({min: 1000, max: 2000}).toString()
      }
  
      const result = await controller.api(body, pathParam);
      expect(result).not.toBeNull();
  
      const stopReview = await databases.transiterStopReviewData.get(result.busStop, result.stopReviewRn);
      expect(stopReview).not.toBeNull();
      expect(stopReview.bus).toBe(body.bus);
      expect(stopReview.comment).toBe(body.comment);
      expect(stopReview.safety).toBe(body.safety);
      expect(stopReview.crowd).toBe(body.crowd);
      expect(stopReview.author).toStrictEqual({
        rn: `ANONYMOUS`,
        userName: expect.any(String),
      });
    });
  })

  describe('fails', () => {
    test('user not found', async () => {
      const body = {
        bus: faker.random.arrayElement(['143', '144', '145', 'R5']),
        comment: faker.lorem.words(100).substring(0, 100),
        safety: faker.random.arrayElement(['RED', 'ORANGE', 'GREEN']),
        crowd: faker.datatype.number({min: 0, max: 100}),
        authorRn: faker.datatype.uuid(),
        userName: faker.internet.userName(),
      };
      const pathParam = {
        busStop: faker.datatype.number({min: 1000, max: 2000}).toString()
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
