const mongoose = require('./service').mongoose
const Schema = mongoose.Schema

const answerSchema = new Schema({
  rating: Number,
  userID: String, // should be mongoose.ObjectId,
  question: {
    questionType: String,
    personas: [
      {
        group: Number,
        selected: Boolean,
        qualification: Number
      }
    ],
    showScores: Boolean
  }
})
const Answer = mongoose.model('Answer', answerSchema)

exports.createAnswer = (answerData) => {
  const answer = new Answer(answerData)
  return answer.save()
}
