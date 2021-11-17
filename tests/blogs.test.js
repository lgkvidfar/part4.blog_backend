const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// test('blogs are returned as json', async () => {
//   await api
//     .get('/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

test('there are two blogs', async () => {
    const response = await api.get('/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
  test('the third blog is written by BigBags', async () => {
    const response = await api.get('/blogs')
    console.log(response)

  
    expect(response.body).toBe('BigBags')
  })

  afterAll(() => {
    mongoose.connection.close()
  })