const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const UserModel = require('./mongoose/users.model')
const AnswerModel = require('./mongoose/answers.model')
const QuestionModel = require('./mongoose/questions.model')

app.use(bodyParser.json())

app.post('/user', async (req, res) => {
  const user = await UserModel.createUser(req.body.language)
  res.status(201).send({ id: user._id, questionNumbers: user.questionNumbers })
})

app.get('/user', async (req, res) => {
  const user = await UserModel.getUser(req.query.userID, req.query.language)
  res.status(200).send(user)
})

app.post('/language', async (req, res) => {
  await UserModel.setLanguage(req.body.userID, req.body.language)
  res.status(201).send('Sucsess')
})

app.get('/questions', async (req, res) => {
  const numbers = req.query.questionNumbers
  const questions = await QuestionModel.getQuestions(numbers)
  questions.push({ questionType: 'demographics' })
  res.status(200).send(questions)
})

app.post('/answer', async (req, res) => {
  await AnswerModel.updateAnswer(req.body)
  res.status(201).send('Success')
})

app.get('/answers', async (req, res) => {
  const answers = await AnswerModel.getAnswers(req.query.userID)
  res.status(200).send(answers)
})

app.post('/demographics', async (req, res) => {
  const answer = {
    question: {
      questionType: 'demographics',
      number: null,
      showScores: null,
    },
    rating: null,
    timeElapsed: req.body.timeElapsed,
    userID: req.body.userID,
  }
  await Promise.all([
    AnswerModel.createAnswer(answer),
    UserModel.addDemographics(req.body),
  ])
  res.status(201).send('Success')
})

app.post('/personality', async (req, res) => {
  const answer = {
    question: {
      questionType: 'personality',
      number: null,
      showScores: null,
    },
    rating: null,
    timeElapsed: req.body.timeElapsed,
    userID: req.body.userID,
  }
  await Promise.all([
    AnswerModel.createAnswer(answer),
    UserModel.addPersonality(req.body),
  ])
  res.status(201).send('Success')
})

module.exports = {
  path: '/api/',
  handler: app,
}
