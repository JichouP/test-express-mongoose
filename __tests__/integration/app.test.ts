import mongoose from 'mongoose';
import request from 'supertest';
import { connectMock, disconnectMock } from '../../utils/util';
import app from '../../app';

describe('integration user', () => {
  beforeAll(connectMock(mongoose, 'jest-integration'));
  afterAll(disconnectMock(mongoose));

  test('should 404', async () => {
    await request(app).get('/').expect(404);
  });
});
