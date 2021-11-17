const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Go To Statemt Considered Harmful',
        author: 'donald duck',
        url: 'http://www.u.ona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        blogs: 33
      },
      {
        title: 'Go To StatemeCondered Harmful',
        author: 'Edsger',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        blogs: 6

      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        "likes": 25,
        blogs: 1

      },
      {
        title: 'Go To Statement Conered Harmful',
        author: ' W. ',
        url: 'http://www.u.ari.edu/~rubinson/copyright_vlations/Go_To_Considered_Harmful.html',
        likes: 22,
        blogs: 31

      },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
})

test('there are two blogs', async () => {
    const response = await api.get('/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
})
  
  test('the third blog is written by BigBags', async () => {
    const response = await api.get('/blogs')
    console.log(response.body)
  
    const authors = response.body.map(r => r.author)
    expect(authors).toContain(
    'Edsger'
  )
  })

  afterAll(() => {
    mongoose.connection.close()
  })