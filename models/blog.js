const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: {type: String, require: true},
    url: String,
    likes: Number,
    blogs: Number
  })
  
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)