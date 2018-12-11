import auth from './auth/routes';
import form from './form/routes';

export default (app, base) => {
  app.use(`${base}/auth`, auth);
  app.use(`${base}/form`, form);
};
