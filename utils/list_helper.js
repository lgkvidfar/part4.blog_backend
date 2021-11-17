const mongoose = require('mongoose')

// //test one blog
//     const dummy  = (blogs) => 1
//         module.exports = {
//         dummy
//         }

// test many likes
//     const totalLikes = (blogsArray) => {
//         const likes = blogsArray.map(blog => blog.likes)
//         const sum = likes.reduce((a,b) => a+b, 0)

//     return sum
//     }

//     module.exports = {
//         totalLikes
//     }

//test find favorite blog
    // const favoriteBlog = (blogs) => {
    //     let fav = blogs
    //     .reduce((acc, blogs) => acc.likes = acc.likes > blogs.likes ? acc : blogs, 0)

    //       return fav
    // }
    // module.exports = {
    //             favoriteBlog
    //         }

 //test find most published author 
    const mostPublished = (blogsArray) => {
        const most = blogsArray.reduce((a,b) => a.blogs > b.blogs ? a : b)
        return most.author
    }
    module.exports = {
        mostPublished
            }