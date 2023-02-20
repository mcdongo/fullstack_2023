const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = request.body

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    likes: blog.likes || 0
  })

  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter