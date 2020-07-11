const mongoose = require('./service').mongoose
const Schema = mongoose.Schema

const answerSchema = new Schema({
  rating: Number,
  userID: mongoose.ObjectId,
  timeElapsed: Date,
  question: {
    questionType: String,
    number: Number,
    personas: [
      {
        group: Number,
        selected: Boolean,
        qualification: Number,
      },
    ],
    showScores: Boolean,
  },
})
// don't recompile model on hot reload
const Answer = mongoose.models.Answer || mongoose.model('Answer', answerSchema)

exports.createAnswer = (answerData) => {
  answerData.userID = new mongoose.Types.ObjectId(answerData.userID)
  const answer = new Answer(answerData)
  return answer.save()
}
