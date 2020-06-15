const mongoose = require('./service').mongoose
const Schema = mongoose.Schema

const userSchema = new Schema({})
const User = mongoose.model('User', userSchema)

exports.createUser = () => {
  const user = new User()
  return user.save()
}
