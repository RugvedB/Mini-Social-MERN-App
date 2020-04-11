const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CommentSchema = new Schema({
  content: {
    type: String,
    required:true
  },
  image_url: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post',
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Comment = mongoose.model('Comment', CommentSchema)