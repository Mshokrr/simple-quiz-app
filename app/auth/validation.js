import Joi from 'joi';

export default {
  register: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(4)
        .required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.number()
        .min(1)
        .max(2)
    }
  },
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }
  }
};
