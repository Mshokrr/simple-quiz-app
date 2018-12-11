import expressValidation from 'express-validation';
import { Logger } from '.';

/* eslint-disable no-unused-vars */
const defaultHandler = (err, req, res, next) => {
  Logger.error(err.message || err.errors[0].messages || err.errors[0].message);
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof expressValidation.ValidationError) {
    res.status(400).json({ message: 'Validation Error', data: err.errors });
  } else {
    res.status(err.status || 500);
    res.send(err);
  }
};

export default {
  defaultHandler
};
