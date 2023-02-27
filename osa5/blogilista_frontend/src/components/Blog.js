import { useState } from 'react'

const Blog = ({blog, handleLike}) => {
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
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id}
    handleLike(newBlog)
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleShow}>hide</button> <br />
        {blog.url}<br />
        likes {blog.likes} <button onClick={likeBlog}>like</button><br />
        {blog.user.name}<br />
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