import app from '../src/app';
import request from 'supertest';

import { DepositCreateRequestBody } from '../src/models/deposits';

describe('POST /deposits', () => {
  it('Receive data after data was sent.', async () => {
    const sendData: DepositCreateRequestBody = {
      balanceId: 0,
      amount: 100,
    };
    const result = await request(app)
      .post('/deposits')
      .send(sendData);
    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
  });
});

describe('GET /deposits', () => {
  it('Get all deposit data', async () => {
    const result = await request(app).get('/deposits');
    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
  });
});

describe('GET /deposits/:id', () => {
  it('If the deposit exists, get data.', async () => {
    const result = await request(app).get('/deposits/0');
    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
  });

  it('If the deposit does not exist, throw 404 error.', async () => {
    const result = await request(app).get('/deposits/2');
    expect(result.status).toBe(404);
  });
});
