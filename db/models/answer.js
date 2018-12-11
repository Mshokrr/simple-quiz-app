import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  formData: { type: Object, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

export default mongoose.model('AnswerSet', answerSchema);
