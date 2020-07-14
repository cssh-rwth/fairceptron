const mongoose = require('./service').mongoose
const Schema = mongoose.Schema

const answerSchema = new Schema({
  rating: Number,
  userID: mongoose.ObjectId,
  timeElapsed: Date,
  question: {
    questionType: String,
    number: Number,
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

exports.updateAnswer = (answerData) => {
  const userID = answerData.userID
  answerData.userID = new mongoose.Types.ObjectId(answerData.userID)
  return Answer.updateOne(
    { userID, 'question.number': answerData.question.number },
    answerData,
    // create a new document if no match found
    { upsert: true }
  )
}

exports.getAnswers = (userID) => {
  return Answer.find({ userID }).select('rating question.number')
}
