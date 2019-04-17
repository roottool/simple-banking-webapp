import Express from 'express';

const app = Express();

app.get('/balances', (req, res) => {
  return res.status(404).send('Not found');
});

app.listen(3000, (err: Error) => {
  if (err) {
    throw err;
  }

  console.log('Ready!');
});
