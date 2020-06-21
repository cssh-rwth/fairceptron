const mongoose = require('mongoose')
require('dotenv').config()

const options = {
  // geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@fairceptron.ahnert.dev:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`,
  options
)

exports.mongoose = mongoose
