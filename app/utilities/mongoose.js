import mongoose from 'mongoose';
import config from '@config';
import { Logger } from '@util';

// require database URL from properties file
const dbURL = config.mongoose[process.env.NODE_ENV || 'development'];

// export this function and imported by server.js
const mongooseConnect = cb => {
  mongoose.connect(
    dbURL,
    { useNewUrlParser: true }
  );

  mongoose.connection.on('connected', () => {
    Logger.info(('Mongoose default connection is open to ', dbURL));
    if (cb) cb();
  });

  mongoose.connection.on('error', err => {
    Logger.error(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on('disconnected', () => {
    Logger.warn('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      Logger.warn(
        'Mongoose default connection is disconnected due to application termination'
      );
      process.exit(0);
    });
  });
};

export default mongooseConnect;
