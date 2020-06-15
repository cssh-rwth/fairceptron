import { generateRandomQuestion } from './generateQuestion'

const express = require('express')
const app = express()

const UserModel = require('./mongoose/users.model')

app.get('/random', (req, res) => {
  res.json(generateRandomQuestion())
})

app.post('/user', (req, res) => {
  UserModel.createUser().then((result) => {
    res.status(201).send({ id: result._id })
  })
})

module.exports = {
  path: '/api/',
  handler: app
}
