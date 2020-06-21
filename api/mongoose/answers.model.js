const mongoose = require('./service').mongoose
const Schema = mongoose.Schema

const answerSchema = new Schema({
  rating: Number,
  userID: mongoose.ObjectId,
  timeElapsed: Date,
  question: {
    questionType: String,
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
const Answer = mongoose.model('Answer', answerSchema)

exports.createAnswer = (answerData) => {
  answerData.userID = new mongoose.Types.ObjectId(answerData.userID)
  const answer = new Answer(answerData)
  return answer.save()
}
