import Express from 'express';
import BodyParser from 'body-parser';
import Balances from './route/balances';
import Deposits from './route/deposits';

const app = Express();

app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.use(BodyParser.json());

app.use(Balances);
app.use(Deposits);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log('Ready!');
  });
}

export default app;
