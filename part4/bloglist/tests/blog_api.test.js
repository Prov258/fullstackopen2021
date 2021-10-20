const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
let token

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()

    const responseLogin = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'sekret'
        })
    token = responseLogin.body.token

    const blogs = helper.initialBlogs.map(blog => new Blog({...blog, user: savedUser._id}))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)

})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has an id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'How fast make a pizza',
        author: 'HFM',
        url: "https://www.youtube.com",
        likes: 8
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(i => i.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('How fast make a pizza')
})

test('if the likes property is missing, it will default to 0', async () => {
    const newBlog = {
        title: 'Without likes',
        author: 'Some instagirl',
        url: "https://www.instagram.com",
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)

    expect(response.body.likes).toBe(0)
})

test('if title and url is missing, backend will send code 400', async () => {
    const newBlog = {
        author: 'Master',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400)
})

test('blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogId = blogsAtStart[0].id
    
    await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtEnd).not.toContain(blogsAtStart[0])
})

test('blog can be updated', async () => {
    const newBlog = {
        title: 'How to gain muscles?',
        author: 'Oleksandr Nevsky',
        url: "https://www.google.com",
        likes: 4
    }
    const blogsAtStart = await helper.blogsInDb()
    const blogId = blogsAtStart[0].id

    const updatedBlog = await api
        .put(`/api/blogs/${blogId}`)
        .send(newBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(updatedBlog).not.toEqual(blogsAtStart[0])
})

test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
        title: 'Blog that will not be added',
        author: 'Man',
        url: "https://www.google.com",
        likes: 10
    }
    const blogsAtStart = await helper.blogsInDb()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

afterAll(() => {
    mongoose.connection.close()
})