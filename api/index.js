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
  const totalQuestions = 10
  if (req.query.number <= totalQuestions) {
    const question = generateRandomQuestion() // getPreSurveyQuestion(req.query.number)
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

app.get('/questions', (req, res) => {
  const numbers = req.query.questionNumbers
  const questions = []
  for (let i = 0; i < numbers.length; i++) {
    questions.push(getPreSurveyQuestion(numbers[i])) // TODO: get from DB
  }
  questions.push({ questionType: 'demographics' })
  res.status(200).send(questions)
})

app.post('/user', (req, res) => {
  UserModel.createUser().then((result) => {
    res
      .status(201)
      .send({ id: result._id, questionNumbers: result.questionNumbers })
  })
})

app.get('/user', (req, res) => {
  // TODO: get from DB
  res.status(200).send({ questionNumbers: [5, 3] })
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
