import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target['anecdote-input'].value
	e.target['anecdote-input'].value = ''
	const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
	dispatch(notify(`Anecdote '${newAnecdote.content}' added`))
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