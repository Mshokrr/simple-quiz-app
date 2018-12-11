import createError from 'http-errors';
import { validate, pipelines } from '@util';
import auth from '@auth';
import validation from './validation';
import roles from './roles';

import model from './model';
import helper from './helper';

/**
 * form Controller
 * @module formController
 */

const getQuestions = (req, res, next) => {
  model
    .getQuestions()
    .then(questions => {
      req.data = { ...req.data, questions };
      next();
    })
    .catch(_ => next(createError(500, 'Internal server error')));
};

const addQuestions = (req, res, next) => {
  if (req.body.questions) {
    model
      .addQuestions(req.body.questions)
      .then(questions => {
        req.data = { ...req.data, questions };
        next();
        return;
      })
      .catch(_ => next(createError(500, 'Internal server error')));
  } else if (req.body.question) {
    model
      .addQuestions([req.body.question])
      .then(questions => {
        req.data = { ...req.data, questions };
        next();
        return;
      })
      .catch(_ => next(createError(500, 'Internal server error')));
  } else {
    next();
  }
};

const updateQuestion = (req, res, next) => {
  model
    .updateQuestion(req.params.id, req.body.question)
    .then(() => next())
    .catch(_ => next(createError(500, 'Internal server error')));
};

const deactivateQuestion = (req, res, next) => {
  model
    .deactivateQuestion(req.params.id)
    .then(() => next())
    .catch(_ => next(createError(500, 'Internal server error')));
};

const addAnswerSet = (req, res, next) => {
  if (req.data.answerSet.valid) {
    model
      .addAnswerSet({
        formData: req.data.answerSet.formData,
        userId: req.decoded.id,
        userName: `${req.decoded.firstName} ${req.decoded.lastName} <${
          req.decoded.email
        }>`,
        questions: req.data.answerSet.fieldsUsed
      })
      .then(() => next())
      .catch(err => {
        console.log(err);
        next(createError(500, 'Internal server error'));
      });
  } else {
    req.data = { ...req.data, errors: req.data.errors };
    next(createError(400, 'Invalid schema. 1'));
  }
};

const validateAndAddAnswerSet = (req, res, next) => {
  helper
    .validateAnswerSchema(req.body.data)
    .then(answerSet => {
      if (answerSet.errors.length) {
        next(createError(400, new Error('Invalid Schema. 2')));
        return;
      }
      req.data = { ...req.data, answerSet };
      addAnswerSet(req, res, next);
    })
    .catch(() => next(createError(400, 'Invalid schema. 3')));
};

const getAnswers = (req, res, next) => {
  model.getAnswers().then(answers => {
    req.data = { ...req.data, answers };
    next();
  });
};

export default {
  getQuestions: [
    validate(validation.getQuestions),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.getQuestions),
    getQuestions
  ],
  addQuestions: [
    validate(validation.addQuestions),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.getQuestions),
    addQuestions
  ],
  updateQuestion: [
    validate(validation.updateQuestion),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.getQuestions),
    updateQuestion
  ],
  deactivateQuestion: [
    validate(validation.deactivateQuestion),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.getQuestions),
    deactivateQuestion
  ],
  submitAnswers: [
    validate(validation.submitAnswers),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.submitAnswers),
    validateAndAddAnswerSet
  ],
  getAnswers: [
    validate(validation.getAnswers),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.getAnswers),
    getAnswers
  ]
};
