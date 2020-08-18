import mongoose from 'mongoose';
import request from 'supertest';
import { connectMock, disconnectMock } from '../../utils/util';
import { userModel, UserDocument } from '../../models/user';
import app from '../../app';
const initUsers = [{ name: 'user1' }, { name: 'user2' }, { name: 'user3' }];
let users: UserDocument[] = [];

describe('integration user', () => {
  beforeAll(connectMock(mongoose, 'jest-integration'));
  beforeEach(async () => {
    await userModel.deleteMany({});
    users = await userModel.insertMany(initUsers);
  });
  afterAll(disconnectMock(mongoose));

  test('GET /user', async () => {
    const response = await request(app)
      .get(`/user`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toEqual(3);
  });
  test('GET /user/:id', async () => {
    const response = await request(app)
      .get(`/user/${users[0]._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.name).toEqual('user1');
  });
  test('POST /user', async () => {
    const response = await request(app)
      .post(`/user`)
      .send({ name: 'user4' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.name).toEqual('user4');
  });
});
