const request = require('supertest');
const { connectMock, disconnectMock } = require('../../utils/util');
const app = require('../../app');

describe('integration user', () => {
  beforeAll(connectMock('jest-integration'));
  afterAll(disconnectMock);

  test('should 404', async () => {
    await request(app).get('/').expect(404);
  });
});
