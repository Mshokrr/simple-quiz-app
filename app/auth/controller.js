import createError from 'http-errors';
import { validate } from '@util';
import validation from './validation';

import model from './model';
import helper from './helper';

/**
 * auth Controller
 * @module authController
 */

const registerUser = (req, res, next) => {
  model
    .findUser(req.body.email)
    .then(user => {
      if (!user) {
        return model.addUser(req.body);
      } else {
        return Promise.reject(new Error('User already exists'));
      }
    })
    .then(user => {
      req.data = {
        ...req.data,
        user: { ...user.toJSON(), roleName: helper.mapRole(user.role) }
      };
      next();
    })
    .catch(err => {
      console.log(err);
      next(createError(403, err.message));
    });
};

const authenticateUser = (req, res, next) => {
  model
    .findUser(req.body.email)
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
        return;
      }
      if (!helper.validatePassword(req.body.password, user.password)) {
        next(createError(401, 'Unauthorized, wrong username or password.'));
        return;
      }
      req.data = {
        ...req.data,
        user: { ...user.toJSON(), roleName: helper.mapRole(user.role) }
      };
      next();
    })
    .catch(err => {
      console.log(err);
      next(createError(500, 'Internal server error.'));
    });
};

const generateJWT = (req, res, next) => {
  const user = req.data.user;
  if (!user) {
    next(createError(403, 'Forbidden'));
    return;
  }
  const token = helper.generateJwtSyncDay({
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    roleName: helper.mapRole(user.role)
  });
  req.data = { ...req.data, token };
  next();
};

const ensureAuthenticated = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;
  if (!token) {
    next(createError(401, 'No Token Provided'));
    return;
  }
  helper
    .verifyJwt(token)
    .then(decoded => {
      req.decoded = { ...decoded, authenticated: true };
      next();
    })
    .catch(_ => next(createError(401, 'Unauthorized, invalid token')));
};

export default {
  register: [validate(validation.register), registerUser, generateJWT],
  login: [validate(validation.login), authenticateUser, generateJWT],
  ensureAuthenticated,
  authTest: [
    ensureAuthenticated,
    (req, res, next) => {
      req.data = { ...req.data, decoded: req.decoded };
      next();
    }
  ]
};
