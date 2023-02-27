import { useState } from 'react'

const BlogForm = ({
  handleAddition
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleAddition({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            value={title} onChange={({ target }) => setTitle(target.value)}
            placeholder='book title'
            id='title'
          />
        </div>
        <div>
            author:
          <input
            value={author} onChange={({ target }) => setAuthor(target.value)}
            placeholder='book author'
            id='author'
          />
        </div>
        <div>
            url:
          <input
            value={url} onChange={({ target }) => setUrl(target.value)}
            placeholder='book url'
            id='blog-url'
          />
        </div>
        <div>
          <button type='submit' id='submit-button'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm