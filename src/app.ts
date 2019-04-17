import Express from 'express';
import BodyParser from 'body-parser';
import firebase from 'firebase';

import { BalanceCreateRequestBody, BalanceCreateResponseBody } from './models/balances';
import config from './firebase/config';

firebase.initializeApp(config);
const db = firebase.firestore();
const balances = 'Balances';
const app = Express();

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.use(BodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log('Ready!');
  });
}

app.post('/balances', async (req, res) => {
  const recievedData: BalanceCreateRequestBody = req.body;
  const sendData: BalanceCreateResponseBody = {
    balance: {
      id: recievedData.balanceId,
      amount: recievedData.amount,
      createdAt: new Date(),
    },
  };

  return await db
    .collection(balances)
    .add(sendData)
    .then(() => {
      res.send(sendData);
    })
    .catch(() => {
      res.status(400);
    });
});

app.get('/balances/:balanceId', (req, res) => {
  return res.status(404).send('Not found');
});

export default app;
