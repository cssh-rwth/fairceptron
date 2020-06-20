const mongoose = require('mongoose')

const options = {
  // geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(
  'mongodb://mongoose:qW8vj27cHwRD8XtxyBLH@fairceptron.ahnert.dev:27017/fairceptronDB?authSource=fairceptronDB',
  options
)

exports.mongoose = mongoose
