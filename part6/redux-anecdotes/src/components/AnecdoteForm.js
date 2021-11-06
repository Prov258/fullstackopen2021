import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target['anecdote-input'].value
	e.target['anecdote-input'].value = ''
    dispatch(createAnecdote(content))
	dispatch(notify(`Anecdote '${content}' added`))
	setTimeout(() => {
		dispatch(removeNotification())
	}, 5000)
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