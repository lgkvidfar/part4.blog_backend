const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe("when there are two initial blogs in helper", () => {

  test('all blogs are returned', async () => {
    const response = await api.get('/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
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

test('the second blog is written by "some bigger dude"', async () => {
  const response = await api.get('/blogs')

  const authors = response.body.map(r => r.author)
  expect(authors).toContain(
  'some bigger dude'
)
})

test('there is an id for each blog', async () => {
  const response = await api.get('/blogs')

    for(let each of response.body) {
    expect(each.id).toBeDefined()
    }
  })

})

describe("adding blogs is done correctly", () => {

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

test('blog without author is not added', async () => {
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

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
    mongoose.connection.close()
  })