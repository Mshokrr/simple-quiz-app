import models from '@model';
import { model } from 'mongoose';

/**
 * form Model Layer
 * @module formModel
 */

const getQuestions = () => models.Question.find({ active: true });

const addQuestions = questions => models.Question.insertMany(questions);

const updateQuestion = (id, question) =>
  models.Question.update({ _id: id }, { $set: question });

const deactivateQuestion = id =>
  models.Question.update({ _id: id }, { $set: { active: false } });

const addAnswerSet = answers => models.AnswerSet.create(answers);

const getAnswers = () => models.AnswerSet.find();

const getAnswerDetails = id => models.AnswerSet.findOne({ _id: id });

const getQuestionsUsed = ids => models.Question.find({ _id: { $in: ids } });

export default {
  getQuestions,
  addQuestions,
  updateQuestion,
  deactivateQuestion,
  addAnswerSet,
  getAnswers,
  getAnswerDetails,
  getQuestionsUsed
};
