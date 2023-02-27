import { useState } from 'react'

const Blog = ({blog}) => {
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
    console.log(showAll)
    console.log(blog)
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <br />
        {blog.url}<br />
        likes {blog.likes} <button onClick={toggleShow}>like</button><br />
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