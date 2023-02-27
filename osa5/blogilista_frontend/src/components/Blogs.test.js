import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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