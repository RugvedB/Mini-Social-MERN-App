const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const NotificationSchema = new Schema({
  content: {
    type: String,
    required:true
  },
  sentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true
  },
  notificationType:{
      type:Number,//2->like
      required:true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post',
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Notification = mongoose.model('Notification', NotificationSchema)