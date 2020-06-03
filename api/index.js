import { generateRandomQuestion } from './generateQuestion'

const express = require('express')
const app = express()

app.get('/random', (req, res) => {
  res.json(generateRandomQuestion())
})

module.exports = {
  path: '/api/',
  handler: app
}
