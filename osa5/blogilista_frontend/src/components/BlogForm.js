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
    <div>
      <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input value={title} onChange={({ target }) => setTitle(target.value)}/>
          </div>
          <div>
            author:
            <input value={author} onChange={({ target }) => setAuthor(target.value)}/>
          </div>
          <div>
            url:
            <input value={url} onChange={({ target }) => setUrl(target.value)} />
          </div>
          <div>
            <button type='submit'>create</button>
          </div>
        </form>
    </div>
  )
}

export default BlogForm