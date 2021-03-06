const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const body = req.body

    if(!body.password){
        return res.status(400).json({ error: 'password is required' })
    }
    if(body.password.length < 3){
        return res.status(400).json({ error: 'password should be longer than 3' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({}).populate('blogs', { title: 1, url: 1, id: 1, likes: 1 })
    res.json(users)
})

module.exports = usersRouter