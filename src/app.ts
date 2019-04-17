import Express from 'express';
import bodyParser from 'body-parser';
import firebase from 'firebase';

import { BalanceCreateRequestBody, BalanceCreateResponseBody } from './models/balances';
import config from './firebase/config';

firebase.initializeApp(config);
const db = firebase.firestore();
const app = Express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log('Ready!');
  });
}

app.post('/balances', (req, res) => {
  const recievedData: BalanceCreateRequestBody = req.body;
  const sendData: BalanceCreateResponseBody = {
    balance: {
      id: recievedData.balanceId,
      amount: recievedData.amount,
      createdAt: new Date(),
    },
  };

  return res.send(sendData);
});

app.get('/balances/:balanceId', (req, res) => {
  return res.status(404).send('Not found');
});

export default app;
