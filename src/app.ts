import Express from 'express';
import BodyParser from 'body-parser';
import firebase from 'firebase';

import { BalanceCreateRequestBody, BalanceCreateResponseBody } from './models/balances';
import { Deposit, DepositCreateRequestBody, DepositCreateResponseBody } from './models/deposits';
import config from './firebase/config';

firebase.initializeApp(config);
const db = firebase.firestore();
const balancesStore = db.collection('balances');
const depositsStore = db.collection('deposits');
const app = Express();

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.use(BodyParser.json());

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

app.post('/deposits', async (req, res) => {
  const recievedData: DepositCreateRequestBody = req.body;
  const sendData: DepositCreateResponseBody = {
    deposit: {
      id: 0,
      balanceId: recievedData.balanceId,
      amount: recievedData.amount,
      createdAt: new Date(),
    },
  };

  await depositsStore
    .doc(sendData.deposit.id.toString())
    .set(sendData)
    .then(() => {
      return res.status(200).send(sendData);
    })
    .catch(() => {
      return res.status(400).send(badRequest);
    });
});

const fetchAllDeposits = (querySnapshot: firebase.firestore.QuerySnapshot): Deposit[] => {
  const alldepositData: Deposit[] = [];

  querySnapshot.forEach(doc => {
    alldepositData.push(doc.data() as Deposit);
  });

  return alldepositData;
};

app.get('/deposits', async (req, res) => {
  await depositsStore
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        return res.status(404).send(notFound);
      } else {
        return res.send(fetchAllDeposits(querySnapshot));
      }
    })
    .catch(() => {
      return res.status(400).send(badRequest);
    });
});

app.get('/deposits/:id', async (req, res) => {
  await depositsStore
    .doc(req.params.id.toString())
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

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log('Ready!');
  });
}

export default app;
