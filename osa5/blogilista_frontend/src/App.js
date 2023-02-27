import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

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
      setNotificationType('success')
      setNotificationMessage(`login succesful as ${userName}`)
      setUser(user)
      setUsername('')
      setPassword('')
      resetMessage()
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage('wrong username or password')
      console.log('väärät tiedot')
      resetMessage()
    }
  }

  const handleAddition = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    console.log(newBlog.title, newBlog.author, newBlog.url)

    await blogService.create(newBlog)
    setNotificationType('success')
    setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setBlogs(blogs.concat(newBlog))
    resetMessage()
  }

  const logOut = () => {
    console.log(user.username, user.token)
    setUser(null)
    blogService.setToken(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const resetMessage = () => {
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Message message={notificationMessage} type={notificationType} />
        <Login
          handleLogin={handleLogin} username={userName}
          setUsername={setUsername} password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Message message={notificationMessage} type={notificationType} />
      <p>
        {user.username} logged in
        <button onClick={logOut}>logout</button>
      </p>
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        <BlogForm
          handleAddition={handleAddition}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App