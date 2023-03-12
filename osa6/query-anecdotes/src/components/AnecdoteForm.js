import { useContext } from 'react'
import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from 'react-query'
import NotificationContext from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const [notification, dispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({type:'SET_NOTIFICATION', payload:'too short anecdote, must have length 5 or more'})
    } else {
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
    dispatch({type:'SET_NOTIFICATION', payload:`anecdote '${content}' created`})
    }
    setTimeout(() => {
      dispatch({type:'CLEAR_NOTIFICATION'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
