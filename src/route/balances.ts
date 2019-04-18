import Express from 'express';
import { BalanceCreateRequestBody, BalanceCreateResponseBody } from '../models/balances';
import * as Constant from '../constant';

const router = Express.Router();
const balancesStore = Constant.db.collection('balances');

router.post('/balances', async (req, res) => {
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
      return res.status(400).send(Constant.badRequest);
    });
});

router.get('/balances/:balanceId', async (req, res) => {
  await balancesStore
    .doc(req.params.balanceId.toString())
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
