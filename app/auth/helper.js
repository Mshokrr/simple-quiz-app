import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '@config';

/**
 * auth Helpers Module
 * @module authHelper
 */

const generateJwtSyncDay = data =>
  jwt.sign(data, config.jwtSecret, { expiresIn: 60 * 60 * 24 });

const verifyJwt = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

const hashPassword = password => bcrypt.hashSync(password, 10);

const validatePassword = (password, storedPassword) =>
  bcrypt.compareSync(password, storedPassword);

const mapRole = role => {
  if (role === 2) {
    return 'Admin';
  } else {
    return 'Candidate';
  }
};

export default {
  generateJwtSyncDay,
  verifyJwt,
  hashPassword,
  validatePassword,
  mapRole
};
