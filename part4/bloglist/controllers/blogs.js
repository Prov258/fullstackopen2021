const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    const result = await blog.save()

    res.status(201).json(result)
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