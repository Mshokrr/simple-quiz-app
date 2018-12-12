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
  if (req.data.answers.valid) {
    model
      .addAnswerSet({
        formData: req.data.answers.formData,
        userId: req.decoded.id,
        userName: `${req.decoded.firstName} ${req.decoded.lastName} <${
          req.decoded.email
        }>`,
        questions: req.data.answers.questionsAnswered
      })
      .then(() => next())
      .catch(err => {
        console.log(err);
        next(createError(500, 'Internal server error'));
      });
  } else {
    req.data = { ...req.data, errors: req.data.errors };
    next(createError(400, 'Invalid schema.'));
  }
};

const validateAndAddAnswerSet = (req, res, next) => {
  helper
    .validateAnswerSchema(req.body.data)
    .then(answerSet => {
      req.data = { ...req.data, answers: answerSet };
      if (answerSet.errors.length) {
        next();
        return;
      }
      addAnswerSet(req, res, next);
    })
    .catch(err => {
      console.log(err);
      next(createError(400, 'Invalid schema. [2]'));
    });
};

const getAnswers = (req, res, next) => {
  model
    .getAnswers()
    .then(answers => {
      req.data = {
        ...req.data,
        answers: answers.map(answer => ({
          questionsAnswered: answer.questions,
          ...answer.toJSON()
        }))
      };
      next();
    })
    .catch(_ => next(createError(500, 'Internal server error.')));
};

const getAnswerDetails = (req, res, next) => {
  model
    .getAnswerDetails(req.params.id)
    .then(answer => {
      if (!answer) {
        next(createError(404, 'Answer not found, invalid id'));
        return;
      }
      req.data = {
        ...req.data,
        answer: {
          questionsAnsweredIds: answer.questions,
          ...answer.toJSON()
        }
      };
      next();
    })
    .catch(err => {
      console.log(err);
      next(createError(404, 'Answer not found, invalid id'));
    });
};

const embedQuestionsUsed = (req, res, next) => {
  model
    .getQuestionsUsed(req.data.answer.questions)
    .then(questions => {
      req.data = {
        ...req.data,
        answer: { ...req.data.answer, questionsAnsweredDetails: questions }
      };
      next();
    })
    .catch(err => {
      console.log(err);
      next(createError(500, 'Internal server error.'));
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
    pipelines.checkRole(roles.addQuestions),
    addQuestions
  ],
  updateQuestion: [
    validate(validation.updateQuestion),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.updateQuestion),
    updateQuestion
  ],
  deactivateQuestion: [
    validate(validation.deactivateQuestion),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.deactivateQuestion),
    deactivateQuestion
  ],
  submitAnswer: [
    validate(validation.submitAnswer),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.submitAnswer),
    validateAndAddAnswerSet
  ],
  getAnswers: [
    validate(validation.getAnswers),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.getAnswers),
    getAnswers
  ],
  getAnswerDetails: [
    validate(validation.getAnswerDetails),
    auth.ensureAuthenticated,
    pipelines.checkRole(roles.getAnswerDetails),
    getAnswerDetails,
    embedQuestionsUsed
  ]
};
