import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NoteForm from './components/NoteForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: userName, password: password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('väärät tiedot')
    }
  }

  const handleAddition = async (event) => {
    event.preventDefault()
    console.log(title, author, url)
    const newObject = {title, author, url}

    await blogService.create(newObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(newObject))
  }

  const logOut = () => {
    console.log(user.username, user.token)
    setUser(null)
    blogService.setToken(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (user === null) {
    return (
      <div>
        <Login handleLogin={handleLogin} username={userName}
        setUsername={setUsername} password={password} setPassword={setPassword}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={logOut}>logout</button>
      </p>
      <NoteForm handleAddition={handleAddition} title={title} setTitle={setTitle}
      author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App