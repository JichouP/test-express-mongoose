const mongoose = require('mongoose');
const { createRequestMock, connectMock, disconnectMock } = require('../../utils/util');
const User = require('../../routes/user');
const userModel = require('../../models/user').userModel;
const initUsers = [{ name: 'user1' }, { name: 'user2' }, { name: 'user3' }];
let users = [];

describe('routes/user', () => {
  beforeAll(connectMock('jest-routes'));
  beforeEach(async () => {
    await userModel.deleteMany({});
    users = await userModel.insertMany(initUsers);
  });
  afterAll(disconnectMock);

  describe('findList', () => {
    test('shuld get user list', async () => {
      const [req, res, next] = createRequestMock();

      await User.findList(req, res, next);
      expect(res.status.calledWith(200)).toBeTruthy();
      expect(res.send.getCall(0).args[0].length).toBe(initUsers.length);
    });
  });
  describe('find', () => {
    test('shuld get user', async () => {
      const [req, res, next] = createRequestMock({ params: { id: users[0]._id } });

      await User.find(req, res, next);
      expect(res.status.calledWith(200)).toBeTruthy();
      const body = res.send.getCall(0).args[0];
      expect(body.name).toEqual(users[0].name);
      expect(body.createdAt instanceof Date).toBeTruthy();
      expect(mongoose.isValidObjectId(body._id)).toBeTruthy();
    });
    test('should fail to get user', async () => {
      const [req, res, next] = createRequestMock({ params: { id: '' } });

      await User.find(req, res, next);
      expect(res.status.calledWith(400)).toBeTruthy();
    });
  });
  describe('create', () => {
    test('shuld create user', async () => {
      const [req, res, next] = createRequestMock({ body: { name: 'user4' } });

      await User.create(req, res, next);
      expect(res.status.calledWith(201)).toBeTruthy();
    });
    describe('validation', () => {
      test('should fail to create duplicate user', async () => {
        const [req, res, next] = createRequestMock({ body: { name: 'user1' } });

        await User.create(req, res, next);
        expect(res.status.calledWith(400)).toBeTruthy();
      });
      test('should fail to create blank user', async () => {
        const [req, res, next] = createRequestMock({ body: {} });

        await User.create(req, res, next);
        expect(res.status.calledWith(400)).toBeTruthy();
      });
    });
  });
});
