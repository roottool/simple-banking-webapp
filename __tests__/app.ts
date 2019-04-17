import app from '../src/app';
import request from 'supertest';

describe('GET /balences/balancesId', () => {
  it('If the balance does not exist, throw 404 error.', async () => {
    const result = await request(app).get('/balances/1');
    expect(result.status).toEqual(404);
  });
});
