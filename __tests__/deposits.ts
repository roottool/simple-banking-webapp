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
