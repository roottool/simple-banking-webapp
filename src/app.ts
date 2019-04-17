import Express from 'express';
import BodyParser from 'body-parser';
import firebase from 'firebase';

import { BalanceCreateRequestBody, BalanceCreateResponseBody } from './models/balances';
import config from './firebase/config';

firebase.initializeApp(config);
const db = firebase.firestore();
const balancesStore = db.collection('balances');
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

const badRequest = 'Bad request';
const notFound = 'Not Found';

app.post('/balances', async (req, res) => {
  const recievedData: BalanceCreateRequestBody = req.body;
  const sendData: BalanceCreateResponseBody = {
    balance: {
      id: recievedData.balanceId,
      amount: recievedData.amount,
      createdAt: new Date(),
    },
  };

  await balancesStore
    .doc(sendData.balance.id.toString())
    .set(sendData)
    .then(() => {
      return res.status(200).send(sendData);
    })
    .catch(() => {
      return res.status(400).send(badRequest);
    });
});

app.get('/balances/:balanceId', async (req, res) => {
  await balancesStore
    .doc(req.params.balanceId.toString())
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.send(doc.data());
      } else {
        return res.status(404).send(notFound);
      }
    })
    .catch(() => {
      return res.status(400).send(badRequest);
    });
});

export default app;
