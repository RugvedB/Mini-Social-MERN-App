const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ChatSchema = new Schema({
  roomName: {
    type: String,
    required:true
  },
  content: {
    type: String,
    required:true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},{timestamps:true})

module.exports = Chat = mongoose.model('Chat', ChatSchema)