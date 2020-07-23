const mongoose = require('./service').mongoose
const Schema = mongoose.Schema

const questionSchema = new Schema({
  personas: [
    {
      group: Number,
      selected: Boolean,
      qualification: Number,
    },
  ],
  questionType: String,
  showScores: Boolean,
  groupNames: Array,
  colors: Array,
  number: Number,
  cluster: Number,
})
// don't recompile model on hot reload
const Question =
  mongoose.models.Question || mongoose.model('Question', questionSchema)

let aggRes = null

exports.getQuestions = (numbers) => {
  return Question.find({
    number: { $in: numbers },
  }).select('questionType personas number showScores groupNames colors cluster')
}

exports.randomQuestionEachCluster = async () => {
  // calculate the sizes of all clusters
  const aggregatorOpts = [
    { $group: { _id: '$cluster', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $group: { _id: null, counts: { $push: '$count' } } },
    { $project: { counts: true, _id: false } },
  ]
  // only once when the server restarts
  if (!aggRes) {
    aggRes = await Question.aggregate(aggregatorOpts).exec()
  }
  // generate a random question number in each cluster
  const randomNo = aggRes[0].counts.map((count) => {
    return Math.floor(Math.random() * count)
  })
  // look up the general question numbers
  const numbers = []
  for (let i = 0; i < randomNo.length; i++) {
    const q = await Question.findOne({ cluster: i }).skip(randomNo[i]).exec()
    numbers.push(q.number)
  }
  return numbers
}
