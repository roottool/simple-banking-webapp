import Express from 'express';
import { Deposit, DepositCreateRequestBody, DepositCreateResponseBody } from '../models/deposits';
import * as Constant from '../constant';

const router = Express.Router();
const depositsStore = Constant.db.collection('deposits');

router.post('/deposits', async (req, res) => {
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
      return res.status(400).send(Constant.badRequest);
    });
});

const fetchAllDeposits = (querySnapshot: firebase.firestore.QuerySnapshot): Deposit[] => {
  const alldepositData: Deposit[] = [];

  querySnapshot.forEach(doc => {
    alldepositData.push(doc.data() as Deposit);
  });

  return alldepositData;
};

router.get('/deposits', async (req, res) => {
  await depositsStore
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        return res.status(404).send(Constant.notFound);
      } else {
        return res.send(fetchAllDeposits(querySnapshot));
      }
    })
    .catch(() => {
      return res.status(400).send(Constant.badRequest);
    });
});

router.get('/deposits/:id', async (req, res) => {
  await depositsStore
    .doc(req.params.id.toString())
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.send(doc.data());
      } else {
        return res.status(404).send(Constant.notFound);
      }
    })
    .catch(() => {
      return res.status(400).send(Constant.badRequest);
    });
});

export default router;
