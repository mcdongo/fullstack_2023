const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
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


  test('blogs have an id-field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
  describe('viewing a specific entry', () => {
    test('specific blog can be found in db', async () => {
      const response = await api.get('/api/blogs')

      const contents = response.body.map(x => x.title)

      expect(contents).toContain('React patterns')
    })})


  describe('adding a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Blogi',
        author: 'Kalle Kirjailija',
        url: 'http://google.com',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(x => x.title)
      expect(contents).toContain('Blogi')
    })

    test('default field for likes is 0', async () => {
      const newBlog = {
        title: 'Blogi',
        author: 'Kalle Kirjailija',
        url: 'http://google.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    })

    test('server rejects malformatted inputs', async () => {
      let newBlog = {
        title: 'Blogi',
        author: 'Kalle Kirjailija'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      let blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      newBlog = {
        author: 'Kalle Kirjailija',
        url: 'http://google.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })})

  describe('deletion of an entry', () => {
    test('succeeds with if id is valid', async () => {
      const blogs = await helper.blogsInDb()

      const id = blogs[0].id
      await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogs.length - 1)
    })

    test('fails if the id is invalid', async () => {
      const blogs = await helper.blogsInDb()
      await api
        .delete('/api/blogs/1092381092381092')
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogs.length)
    })
  })

  describe('updating an existing entry', () => {
    test('updating entry with valid id', async () => {
      const blogs = await helper.blogsInDb()
      const newBlog = { ...blogs[0], likes: 15 }

      await api
        .put(`/api/blogs/${newBlog.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd[0].likes).toBe(newBlog.likes)
    })

    test('updating entry with wrong id', async() => {
      const blogs = await helper.blogsInDb()
      const newBlog = { ...blogs[0], likes: 15 }

      await api
        .put('/api/blogs/1298371982471298')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd[0].likes).toBe(blogs[0].likes)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})