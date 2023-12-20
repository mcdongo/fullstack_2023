import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => setToken(localStorage.getItem('bookstore-token')), [])

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommend</button>
          <button onClick={logOut}>log out</button>
        </>
        }
        {!token &&
          <button onClick={() => setPage('login')}>log in</button>
        }
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />

      <RecommendedBooks show={page === 'recommended'} />
    </div>
  )
}

export default App
