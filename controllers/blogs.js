const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON())
  )
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  try{
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
  } catch(error){
    response.status(400).send(error).end()

  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
      try {
        response.json(blog)
      } catch(err) {
        response.status(404).send(error).end()
      }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updated.toJSON())
  } catch(error){
    response.status(400).send({error: "something went wrong with the update"}).end()
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
      const removed = await Blog.findByIdAndRemove(request.params.id)
      response.status(204).json(`${removed.title} was removed`).end()
  } catch(error) {
     response.status(400).send({error: "something went wrong with the remove"}).end()
  }
})


module.exports = blogsRouter