import express from 'express';
import controller from './controller';

const router = express.Router();

/**
 * auth Routes
 * @module authRoutes
 */

router.post('/login', controller.login, (req, res) => {
  res.status(200).json({
    message: 'Login successful',
    data: req.data
  });
});

router.post('/register', controller.register, (req, res) => {
  res.status(200).json({
    message: 'Registration successful',
    data: req.data
  });
});

router.get('/test', controller.authTest, (req, res) => {
  res.status(200).json({
    message: 'Auth test successful',
    data: req.data
  });
});

export default router;
