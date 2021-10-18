const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'How to gain muscles?',
        author: 'Oleksandr Nevsky',
        url: "https://www.google.com",
        likes: 3
    },
    {
        title: 'Programming is fun',
        author: 'Me',
        url: "https://www.youtube.com",
        likes: 3
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}