import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
	return (
		<div>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote)}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const dispatch = useDispatch()

	const vote = ({ id, content }) => {
    	dispatch(voteAnecdote(id))
		dispatch(notify(`You voted '${content}'`))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
  	}

	return (
		<div>
			{anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					vote={vote}
				/>
			)}
		</div>
	)
}

export default AnecdoteList