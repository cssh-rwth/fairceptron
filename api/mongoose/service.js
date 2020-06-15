const mongoose = require('mongoose')

const options = {
  /* autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  // geting rid off the depreciation errors
  */
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(
  'mongodb://mongoose:qW8vj27cHwRD8XtxyBLH@fairceptron.ahnert.dev:27017/fairceptronDB?authSource=fairceptronDB',
  options
)

exports.mongoose = mongoose
