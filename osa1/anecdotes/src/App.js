import { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const MostVotedAnecdote = ({vote, anecdotes}) => {
  let biggest = Math.max(...vote)
  console.log(biggest)
  let index = vote.indexOf(biggest)
  console.log("index", index)

  if (biggest !== 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[index]}</p>
      </div>
    )
  }

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVoted] = useState(Array(anecdotes.length).fill(0))

  const anecdoteHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const voteHandler = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVoted(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button clickHandler={voteHandler} text="vote"/>
      <Button clickHandler={anecdoteHandler} text="next anecdote"/>
      <MostVotedAnecdote vote={vote} anecdotes={anecdotes} />
    </div>
  )
}

export default App