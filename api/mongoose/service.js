const mongoose = require('mongoose')
require('dotenv').config()

const options = {
  // geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connection =
  `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@` +
  `${process.env.MONGO_DOMAIN}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}` +
  `?authSource=${process.env.MONGO_AUTH_SOURCE}`

mongoose.connect(connection, options)

exports.mongoose = mongoose
