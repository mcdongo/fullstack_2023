import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = () => {
    setShowAll(!showAll)
  }
  const likeBlog = () => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    handleLike(newBlog)
  }

  const deleteBlog = () => {
    handleDelete(blog)
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleShow} id='show-blog-button'>hide</button> <br />
        {blog.url}<br />
        likes {blog.likes} <button onClick={likeBlog} id='like-blog-button'>like</button><br />
        {blog.user.name}<br />
        {user.username === blog.user.username &&
          <button onClick={deleteBlog} id='delete-blog-button'>delete</button>
        }
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>view</button>
    </div>
  )
}

export default Blog