const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all blogs are returned', async () => {
  const response = await api.get('/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('the second blog is written by "some bigger dude"', async () => {
    const response = await api.get('/blogs')
    console.log(response.body)
  
    const authors = response.body.map(r => r.author)
    expect(authors).toContain(
    'some bigger dude'
  )
  })

test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'french dude',
      likes: 2
    }
  
    await api
      .post('/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
      const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

test('note without author is not added', async () => {
    const newBlog = new Blog({
      title:"hello"
    })
  
    await api
      .post('/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

describe('find author with most published blogs', () => {
    const blogs = [
      {
        _id: '4444',
        title: 'Go To Statemt Considered Harmful',
        author: 'donald duck',
        url: 'http://www.u.ona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
        blogs: 33
      },
      {
        _id: '3333',
        title: 'Go To StatemeCondered Harmful',
        author: 'Edsger',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0,
        blogs: 6

      },
      {
        _id: '2222',
        title: 'Go To Statement Considered Harmful',
        author: 'Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        "likes": 25,
        __v: 0,
        blogs: 1

      },
      {
        _id: '1111',
        title: 'Go To Statement Conered Harmful',
        author: ' W. ',
        url: 'http://www.u.ari.edu/~rubinson/copyright_vlations/Go_To_Considered_Harmful.html',
        likes: 22,
        __v: 0,
        blogs: 31

      },
    ]
  
  test('when list has more than one blog, find most published author', () => {
      const result = listHelper.mostPublished(blogs)
      expect(result).toEqual(blogs[0].author)
})
})

  afterAll(() => {
    mongoose.connection.close()
  })