const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = request.body

  const user = await User.findById(blog.userId)

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes || 0,
    user: user.id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const newBlog = {
    title: request.body.title,
    url: request.body.url,
    author: request.body.author || null,
    likes: request.body.likes || 0
  }

  await Blog.findByIdAndUpdate(request.params.id,
    newBlog, { new: true, runValidators: true, context: 'query' }
  )
  response.json(newBlog)

})

module.exports = blogRouter