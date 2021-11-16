const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())


app.get('/', (request, response) => {
    response.json({message: "hello world"})
  })

app.get('/api/blogs', (request, response) => {
    Blog.find({})
    .then(returned => {
        response.json(returned)
    })
    .catch(error => {
        console.log('error @ /api/blogs/', error)
        response.status(500).end()
    })
})

app.get('/api/blogs/:id', (request, response) => {
    Blog.findById(request.params.id).then(blog => {
        if(blog) {
            response.json(blog)
        } else {
            response.status(404).send( {error: "id doesn't exist" } )
        }
    })
    .then(returned => {
        response.json(returned)
    })
    .catch(error => {
        console.log('error @ /api/blogs/', error)
        response.status(500).end()
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})