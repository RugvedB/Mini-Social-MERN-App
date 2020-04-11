const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const MyFriendListSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true,
    
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required: true
  }]
  
})

module.exports = MyFriendList = mongoose.model('MyFriendList', MyFriendListSchema)