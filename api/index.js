import {
  generateRandomQuestion,
  getPreSurveyQuestion,
} from './generateQuestion'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const UserModel = require('./mongoose/users.model')
const AnswerModel = require('./mongoose/answers.model')

app.use(bodyParser.json())

app.get('/random', (req, res) => {
  res.json(generateRandomQuestion())
})

app.get('/question', (req, res) => {
  const totalQuestions = 28
  if (req.query.number <= totalQuestions) {
    const question = getPreSurveyQuestion(req.query.number)
    question.totalQuestions = totalQuestions
    res.json(question)
  } else {
    const question = {
      questionType: 'demographics',
      totalQuestions,
    }
    res.status(200).send(question)
  }
})

app.post('/user', (req, res) => {
  UserModel.createUser().then((result) => {
    res.status(201).send({ id: result._id })
  })
})

app.post('/answer', (req, res) => {
  AnswerModel.createAnswer(req.body).then((result) => {
    res.status(201).send('Success')
  })
})

app.post('/demographics', (req, res) => {
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
  AnswerModel.createAnswer(answer)
  UserModel.addDemographics(req.body).then((result) => {
    res.status(201).send('Success')
  })
})

module.exports = {
  path: '/api/',
  handler: app,
}
