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

let aggResSel = null
let aggResRan = null

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

exports.getQuestions = async (numbers) => {
  const questionsfromDB = await Question.find({
    number: { $in: numbers },
  })
    .select('questionType personas number showScores groupNames colors cluster')
    .exec()
  const questions = []
  // restore the ordering as requested
  for (const n in numbers) {
    const questionFound = questionsfromDB.find(
      (q) => q.number === parseInt(numbers[n])
    )
    if (questionFound !== undefined) questions.push(questionFound)
  }
  return questions
}

exports.randomQuestionEachCluster = async () => {
  const selNumbers = await randomSelQuestions()
  const offset = selNumbers.length
  const ranNumbers = await randomRanQuestions(offset)
  return shuffle(selNumbers).concat(shuffle(ranNumbers))
}

const randomSelQuestions = async () => {
  // calculate the sizes of all selection clusters
  const aggregatorOptsSel = [
    { $match: { questionType: 'selection' } },
    { $group: { _id: '$cluster', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $group: { _id: null, counts: { $push: '$count' } } },
    { $project: { counts: true, _id: false } },
  ]
  // only once when the server restarts
  if (!aggResSel) {
    aggResSel = await Question.aggregate(aggregatorOptsSel).exec()
  }

  // generate a random question number in each cluster
  const randomNo = aggResSel[0].counts.map((count) => {
    return Math.floor(Math.random() * count)
  })
  // look up the general question numbers
  const numbers = []
  for (let i = 0; i < randomNo.length; i++) {
    const q = await Question.findOne({ cluster: i }).skip(randomNo[i]).exec()
    if (q && q.number) numbers.push(q.number)
  }
  return numbers
}

const randomRanQuestions = async (offset) => {
  // calculate the sizes of all ranking clusters
  const aggregatorOptsRan = [
    { $match: { questionType: 'ranking' } },
    { $group: { _id: '$cluster', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $group: { _id: null, counts: { $push: '$count' } } },
    { $project: { counts: true, _id: false } },
  ]
  // only once when the server restarts
  if (!aggResRan) {
    aggResRan = await Question.aggregate(aggregatorOptsRan).exec()
  }

  // generate a random question number in each cluster
  const randomNo = aggResRan[0].counts.map((count) => {
    return Math.floor(Math.random() * count)
  })
  // look up the general question numbers
  const numbers = []
  for (let i = 0; i < randomNo.length; i++) {
    const q = await Question.findOne({ cluster: i + offset })
      .skip(randomNo[i])
      .exec()
    if (q && q.number) numbers.push(q.number)
  }
  return numbers
}
