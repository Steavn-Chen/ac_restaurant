const mongoose = require('mongoose')
const findOrCreate = require('mongoose-find-or-create')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', userSchema)