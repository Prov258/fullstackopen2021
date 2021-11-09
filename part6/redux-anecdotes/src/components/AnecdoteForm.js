import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

	const addAnecdote = async (e) => {
		e.preventDefault()
		const content = e.target['anecdote-input'].value
		e.target['anecdote-input'].value = ''
		props.createAnecdote(content)
		props.notify(`Anecdote '${content}' added`)
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

export default connect(
	null,
	{ createAnecdote, notify }
)(AnecdoteForm)