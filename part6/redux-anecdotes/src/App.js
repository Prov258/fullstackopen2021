import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'VOTE', data: { id } })
  }

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target['anecdote-input'].value
    dispatch({ type: 'NEW_ANECDOTE', data: { content } })
    e.target['anecdote-input'].value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input id='anecdote-input' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App