const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'some dude',
    likes: 2
  },
  {
    title: 'HTML is hard',
    author: 'some bigger dude',
    likes: 4
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', author: 'fe dude', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}