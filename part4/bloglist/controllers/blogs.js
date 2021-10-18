const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    console.log(user.blogs)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const newBlog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
    res.json(updatedBlog)
})

module.exports = blogsRouter