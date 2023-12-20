import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../utils/queries"

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('bookstore-token', token)
      setUsername('')
      setPassword('')
      setPage('authors')
    }
  }, [result.data]) //eslint-disable-line


  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(username, password)

    login({ variables: { username, password }})
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h1>
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        name
        <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
        <br />
        password
        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm