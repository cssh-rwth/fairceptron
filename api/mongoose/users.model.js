const mongoose = require('./service').mongoose
const Schema = mongoose.Schema

const QuestionModel = require('./questions.model')

const userSchema = new Schema({
  questionNumbers: Array,
  believe: Number,
  religious: Number,
  political: Number,
  confidence: Number,
  fear: Number,
  will: Number,
  edu: String,
  age: Number,
  gender: String,
  comment: String,
  extraversion: Number,
  agreeableness: Number,
  conscientiousness: Number,
  neuroticism: Number,
  openness: Number,
})
// don't recompile model on hot reload
const User = mongoose.models.User || mongoose.model('User', userSchema)

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

exports.createUser = async () => {
  const questionNumbers = shuffle(
    await QuestionModel.randomQuestionEachCluster()
  )
  const user = new User({ questionNumbers })
  return user.save()
}

exports.getUser = (userID) => {
  const user = User.where({ _id: userID }).findOne()
  return user
}

exports.addDemographics = (values) => {
  if (!values.userID) return Error('No userID specified')

  // update the user (with default values for additionally incomplete data)
  const res = User.updateOne(
    { _id: values.userID },
    {
      believe: values.believe,
      religious: values.religious,
      political: values.political,
      confidence: values.confidence,
      fear: values.fear,
      will: values.will,
      edu: values.edu,
      age: values.age,
      gender: values.gender,
    },
    /* 'omitUndefined: false' is default behaviour
     * undefined params will be stored as NULL in mongoDB
     * on export from mongoDB into csv all fields will hence be included,
     * also those that are NULL on some entries
     */
    { omitUndefined: false }
  )

  return res
}

exports.addPersonality = (values) => {
  if (!values.userID) return Error('No userID specified')

  // recode negatively poled items and check for completeness
  const bfi1 = 6 - values.bfi1 || null
  const bfi2 = values.bfi2 || null
  const bfi3 = 6 - values.bfi3 || null
  const bfi4 = 6 - values.bfi4 || null
  const bfi5 = 6 - values.bfi5 || null
  const bfi6 = values.bfi6 || null
  const bfi7 = 6 - values.bfi7 || null
  const bfi8 = values.bfi8 || null
  const bfi9 = values.bfi9 || null
  const bfi10 = values.bfi10 || null

  // calculate big five from items
  const extraversion =
    bfi1 === null || bfi6 === null ? undefined : (bfi1 + bfi6) / 2
  const agreeableness =
    bfi2 === null || bfi7 === null ? undefined : (bfi2 + bfi7) / 2
  const conscientiousness =
    bfi3 === null || bfi8 === null ? undefined : (bfi3 + bfi8) / 2
  const neuroticism =
    bfi4 === null || bfi9 === null ? undefined : (bfi4 + bfi9) / 2
  const openness =
    bfi5 === null || bfi10 === null ? undefined : (bfi5 + bfi10) / 2

  // update the user (with default values for additionally incomplete data)
  const res = User.updateOne(
    { _id: values.userID },
    {
      comment: values.comment,
      extraversion,
      agreeableness,
      conscientiousness,
      neuroticism,
      openness,
    },
    /* 'omitUndefined: false' is default behaviour
     * undefined params will be stored as NULL in mongoDB
     * on export from mongoDB into csv all fields will hence be included,
     * also those that are NULL on some entries
     */
    { omitUndefined: false }
  )

  return res
}
