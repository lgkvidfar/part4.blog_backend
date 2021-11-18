const User = require('../models/user')

const initialUsers = [
  {
    username: "first",
    name: "first name",
    passwordHash:"1234556789",
  },
  {
    username: "second",
    name: "second name",
    passwordHash:"987654321",
  }
]

const nonExistingId = async () => {
  const user = new User({ DataTransferItemList: 'willremovethissoon', author: 'fe dude', likes: 0 })
  await user.save()
  await user.remove()

  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers, nonExistingId, usersInDb
}