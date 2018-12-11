import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  questionText: String,
  type: {
    type: String,
    default: 'String',
    enum: ['String', 'Boolean', 'Integer']
  },
  required: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
});

export default mongoose.model('Question', QuestionSchema);
