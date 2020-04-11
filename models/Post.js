const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate=require('mongoose-autopopulate')
// Create Schema
const PostSchema = new Schema({
  caption: {
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
  Comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Comment',
    required: true
  }],
  Likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Like',
    required: true
  }],
  postType:{
    type:String,
    default:''
  },
  date: {
    type: Date,
    default: Date.now
  }
})
PostSchema.plugin(autopopulate)
module.exports = Post = mongoose.model('Post', PostSchema)