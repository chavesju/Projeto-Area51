import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import createConnection from './database/';

createConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3335, () => {
  console.log('Company service running in port 3335');
});
