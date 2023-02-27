import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author but nothing else', () => {
  const blog = {
    title: 'Important book',
    author: 'Willy Writer',
    url: 'http://google.com',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText(
    'Important book', { exact: false }
  )
  expect(title).toBeDefined()

  const author = screen.getByText(
    'Willy Writer', { exact: false }
  )
  expect(author).toBeDefined()

  const url = screen.queryByText('http://google.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('0')
  expect(likes).toBeNull()
})

test('render all information after button show has been clicked', async () => {
  const blog = {
    title: 'Important book',
    author: 'Willy Writer',
    url: 'http://google.com',
    likes: 0,
    user: { name: 'generic', username: 'username' }
  }

  const exampleUser = {
    name: 'generic',
    username: 'username'
  }

  render(<Blog blog={blog} user={exampleUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  const title = screen.getByText(
    'Important book', { exact: false }
  )
  expect(title).toBeDefined()

  const author = screen.getByText(
    'Willy Writer', { exact: false }
  )
  expect(author).toBeDefined()

  const url = screen.getByText(
    'http://google.com', { exact: false }
  )
  expect(url).toBeDefined()

  const likes = screen.getByText(
    'likes 0', { exact: false }
  )
  expect(likes).toBeDefined()
})

test('amount of likes increment when like button is pushed', async () => {
  const blog = {
    title: 'Important book',
    author: 'Willy Writer',
    url: 'http://google.com',
    likes: 0,
    user: { name: 'generic', username: 'username' }
  }

  const exampleUser = {
    name: 'generic',
    username: 'username'
  }

  const mockHandler = jest.fn()
  render(<Blog handleLike={mockHandler} blog={blog} user={exampleUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm handleAddition={createBlog} />)
  const title = screen.getByPlaceholderText('book title')
  const author = screen.getByPlaceholderText('book author')
  const url = screen.getByPlaceholderText('book url')
  const saveButton = screen.getByText('create')

  await userEvent.type(title, 'Important book')
  await userEvent.type(author, 'Willy Writer')
  await userEvent.type(url, 'http://google.com')

  await user.click(saveButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Important book')
  expect(createBlog.mock.calls[0][0].author).toBe('Willy Writer')
  expect(createBlog.mock.calls[0][0].url).toBe('http://google.com')
})