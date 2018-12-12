import express from 'express';
import controller from './controller';

const router = express.Router();

/**
 * form Routes
 * @module formRoutes
 */

router.get('/', controller.getAnswers, (req, res) => {
  res.status(200).json({
    message: 'Answers fetched successfully',
    data: req.data
  });
});

router.get('/details/:id', controller.getAnswerDetails, (req, res) => {
  res.status(200).json({
    message: 'Answer fetched successfully',
    data: req.data
  });
});

router.post('/', controller.submitAnswer, (req, res) => {
  res.status(200).json({
    message:
      'Answer data sent. Check the response data for any schematic errors.',
    data: req.data
  });
});

router.get('/questions', controller.getQuestions, (req, res) => {
  res.status(200).json({
    message: 'Questions fetched successfully',
    data: req.data
  });
});

router.post('/questions', controller.addQuestions, (req, res) => {
  res.status(200).json({
    message: 'Questions posted successfully',
    data: req.data
  });
});

router.patch('/questions/:id', controller.updateQuestion, (req, res) => {
  res.status(200).json({
    message: 'Question updated successfully',
    data: req.data
  });
});

router.delete('/questions/:id', controller.deactivateQuestion, (req, res) => {
  res.status(200).json({
    message: 'Question deleted successfully',
    data: req.data
  });
});

export default router;
