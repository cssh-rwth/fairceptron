import { generateRandomQuestion } from './generateQuestion'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const UserModel = require('./mongoose/users.model')
const AnswerModel = require('./mongoose/answers.model')

app.use(bodyParser.json())

app.get('/random', (req, res) => {
  res.json(generateRandomQuestion())
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

module.exports = {
  path: '/api/',
  handler: app
}
