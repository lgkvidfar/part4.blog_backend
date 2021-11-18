const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  try {
  const user = new User({
    username: body.username,
    name: body.name,
    blogs: body.blogs,
    passwordHash,
  })
  const savedUser = await user.save()
  response.json(savedUser)
} catch(error){
  response.json({error: error.message})
}
})

module.exports = usersRouter