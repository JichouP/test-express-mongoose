const mongoose = require('mongoose');
const { mockReq, mockRes } = require('sinon-express-mock');
const User = require('./user');
const userModel = require('../models/user').userModel;

const initUsers = [{ name: 'user1' }, { name: 'user2' }, { name: 'user3' }];
let users = [];

describe('routes/user', () => {
  beforeAll(async () => {
    mongoose.Promise = global.Promise;
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
    users = await userModel.insertMany(initUsers);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('findList', async () => {
    const req = mockReq();
    const res = mockRes();
    const next = jest.fn();

    await User.findList(req, res, next);
    expect(res.status.calledWith(200)).toBeTruthy();
  });
  test('find', async () => {
    const request = { params: { id: users[0]._id } };
    const req = mockReq(request);
    const res = mockRes();
    const next = jest.fn();

    await User.find(req, res, next);
    expect(res.status.calledWith(200)).toBeTruthy();
  });
  test('create', async () => {
    const request = { body: { name: 'userName' } };
    const req = mockReq(request);
    const res = mockRes();
    const next = jest.fn();

    await User.create(req, res, next);
    expect(res.status.calledWith(201)).toBeTruthy();
  });
});
