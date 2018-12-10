import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import expressValidation from 'express-validation';
import createError from 'http-errors';
import routesV1 from './routes.v1';
import { errorHandler } from '@util';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

routesV1(app, '');

app.use((req, res, next) => {
  next(createError(404, 'Route does not exist.'));
});

app.use(errorHandler.defaultHandler);

export default app;
