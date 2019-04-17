import app from '../src/app';
import request from 'supertest';

import { BalanceCreateRequestBody } from '../src/models/balances';

describe('POST /balences', () => {
  it('Receive data after data was sent.', async () => {
    const sendData: BalanceCreateRequestBody = {
      balanceId: 0,
      amount: 100,
    };
    const result = await request(app)
      .post('/balances')
      .send(sendData);
    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
  });
});

describe('GET /balences/balancesId', () => {
  it('If the balance does not exist, throw 404 error.', async () => {
    const result = await request(app).get('/balances/1');
    expect(result.status).toBe(404);
  });
});
