import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target['anecdote-input'].value
    dispatch(createAnecdote(content))
    e.target['anecdote-input'].value = ''
  }

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input id='anecdote-input' /></div>
				<button>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm