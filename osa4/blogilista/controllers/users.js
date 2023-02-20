const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  if (password.length < 4) {
    return response.status(400).send({ error: 'password too short' })
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  response.json(user)
})

module.exports = usersRouter