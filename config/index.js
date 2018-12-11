import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    'SDFRGSRTDEW$SDFFEWFDSG$yfssdf.sdfrwfd43qrf.23era[PDFETYGVAAW#',
  jwtExpiry: process.env.JWT_EXPIRY || 60 * 60 * 24,
  host: process.env.HOST || `http://localhost:${process.env.PORT}`,
  mongoose: {
    production:
      process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/quiz_tool_prod',
    development:
      process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/quiz_tool_dev',
    test: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/quiz_tool_test'
  }
};
