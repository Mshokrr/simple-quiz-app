import models from '@model';
import helper from './helper';

/**
 * auth Model Layer
 * @module authModel
 */

const findUser = email => models.User.findOne({ email });
const addUser = user => {
  return models.User.create({
    ...user,
    password: helper.hashPassword(user.password)
  });
};

export default {
  findUser,
  addUser
};
