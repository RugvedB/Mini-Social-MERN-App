const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const LikeSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Like = mongoose.model('Like', LikeSchema)