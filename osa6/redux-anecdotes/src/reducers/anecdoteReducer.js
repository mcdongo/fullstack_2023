import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {  
    updateAnectodes(state, action) {
      const newAnecdote = action.payload
      state = state.map(anecdote =>
        anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
      )
      return state.sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateAnectodes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdoteObject => {
  const newAnecdote = { ...anecdoteObject, votes: anecdoteObject.votes + 1 }
  return async dispatch => {
    const newObject = await anecdoteService.updateExisting(newAnecdote)
    dispatch(updateAnectodes(newObject))
  }
}

export default anecdoteSlice.reducer