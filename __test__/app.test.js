const request = require('supertest');
const app = require('../app');

describe('GET /api/reservations', () => {
  it('should return a 401 error', async () => {
    await request(app)
      .get('/api/reservations')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});