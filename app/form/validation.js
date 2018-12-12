import Joi from 'joi';

export default {
  getQuestions: {},
  addQuestions: {
    body: {
      questions: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          questionText: Joi.string().required(),
          type: Joi.string().valid('String', 'Boolean', 'Integer'),
          required: Joi.bool()
        })
      ),
      question: Joi.object({
        name: Joi.string().required(),
        questionText: Joi.string().required(),
        type: Joi.string().valid('String', 'Boolean', 'Integer'),
        required: Joi.boolean()
      })
    }
  },
  updateQuestion: {
    params: {
      id: Joi.string().required()
    },
    body: {
      question: Joi.object({
        name: Joi.string(),
        questionText: Joi.string(),
        type: Joi.string().valid('String', 'Boolean', 'Integer'),
        required: Joi.boolean()
      })
    }
  },
  deactivateQuestion: {
    params: {
      id: Joi.string().required()
    }
  },
  submitAnswer: {
    body: {
      data: Joi.object()
    }
  },
  getAnswers: {},
  getAnswerDetails: {}
};
