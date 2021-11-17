const listHelper = require('../utils/list_helper')

//test one blog
    // test('dummy returns one', () => {
    //     const blogs = [

    //     ]
      
    //     const result = listHelper.dummy(blogs)
    //     expect(result).toBe(1)
    //   })

// //test many likes
//     describe('total likes of blogs array', () => {
//         const blogsArray = [
//           {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 5,
//             __v: 0
//           },
//           {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 5,
//             __v: 0
//           },
//         ]
      
//         test('when list has more than one blog, equals the sum of all likes', () => {
//             const result = listHelper.totalLikes(blogsArray)
//           expect(result).toBe(10)
//         })
//       })

// //test find favorite
//     describe('find most like in array of blogs', () => {
//         const blogs = [
//           {
//             _id: '4444',
//             title: 'Go To Statemt Considered Harmful',
//             author: 'donald duck',
//             url: 'http://www.u.ona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 5,
//             __v: 0,
//             blogs: 33
//           },
//           {
//             _id: '3333',
//             title: 'Go To StatemeCondered Harmful',
//             author: 'Edsger W. Dtra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 2,
//             __v: 0,
//             blogs: 6

//           },
//           {
//             _id: '2222',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             "likes": 25,
//             __v: 0,
//             blogs: 1

//           },
//           {
//             _id: '1111',
//             title: 'Go To Statement Conered Harmful',
//             author: 'Eger W. Dijksta',
//             url: 'http://www.u.ari.edu/~rubinson/copyright_vlations/Go_To_Considered_Harmful.html',
//             likes: 22,
//             __v: 0,
//             blogs: 32

//           },
//         ]
      
//         test('when list has more than one blog, find most liked blog', () => {
//           const result = listHelper.favoriteBlog(blogs)
//           expect(result).toMatchObject(blogs[2])
// })
// })


//test find most blogs
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