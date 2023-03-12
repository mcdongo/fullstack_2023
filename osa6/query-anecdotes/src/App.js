import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './notificationContext' 

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const [notification, dispatch] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    console.log(anecdote)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({type:'SET_NOTIFICATION', payload:`anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      dispatch({type:'CLEAR_NOTIFICATION'})
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes)

  if ( result.isLoading ) {
    return (
      <div>loading data...</div>
    )
  } else if ( result.isError ) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
