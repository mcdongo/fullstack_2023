const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
            username<br />
          <input type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
            password<br />
          <input type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}
            id='password'
          />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}

export default Login