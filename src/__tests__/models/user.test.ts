import mongoose from 'mongoose';
import { connectMock, disconnectMock } from '../../utils/util';
import User, { userModel, UserDocument } from '../../models/user';

const initUsers = [{ name: 'user1' }, { name: 'user2' }, { name: 'user3' }];
let users: UserDocument[] = [];

describe('model/user', () => {
  beforeAll(connectMock(mongoose, 'jest-models'));
  beforeEach(async () => {
    await userModel.deleteMany({});
    users = await userModel.insertMany(initUsers);
  });
  afterAll(disconnectMock(mongoose));

  describe('findList', () => {
    test('shuld get user list', async () => {
      const docs = await User.findList();
      expect(docs.length).toBe(3);
    });
  });
  describe('find', () => {
    test('shuld get user', async () => {
      const doc = await User.find({ _id: users[0]._id });
      if (!doc) {
        return;
      }
      expect(doc.name).toEqual(users[0].name);
      expect(doc.createdAt instanceof Date).toBeTruthy();
      expect(mongoose.isValidObjectId(doc._id)).toBeTruthy();
    });
    test('should fail to get user', async () => {
      await expect(User.find({ _id: '' })).rejects.toThrow();
    });
  });
  describe('create', () => {
    test('shuld create user', async () => {
      const doc = await User.create({ name: 'user4' });
      expect(doc.name).toBe('user4');
    });
    describe('validation', () => {
      test('should fail to create duplicate user', async () => {
        await expect(User.create({ name: 'user1' })).rejects.toThrow();
      });
      test('should fail to create blank user', async () => {
        await expect(User.create({} as UserDocument)).rejects.toThrow();
      });
    });
  });
});
