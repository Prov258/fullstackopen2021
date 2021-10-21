const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const { body, token } = req
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(decodedToken.id)

    if(!req.token || blog.user.toString() !== decodedToken.id.toString()){
        return res.status(401).json({ error: 'token missing or invalid user' })
    }

    await blog.remove()
    user.blogs = user.blogs.filter(b => b.toString() !== req.params.id.toString())
    await user.save()
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