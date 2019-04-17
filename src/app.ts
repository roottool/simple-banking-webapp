import Express from 'express';
import firebase from 'firebase';

import config from './firebase/config';

firebase.initializeApp(config);
const db = firebase.firestore();
const app = Express();

app.post('/balances', (req, res) => {
  return res.status(404).send('Not found');
});

app.get('/balances/:balanceId', (req, res) => {
  return res.status(404).send('Not found');
});

export default app;
