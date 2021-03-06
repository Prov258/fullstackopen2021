import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

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
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		if(!filter){
			return anecdotes
		}

		return anecdotes.filter(a => a.content.toLowerCase().startsWith(filter))
	})
	const dispatch = useDispatch()

	const vote = (anecdote) => {
    	dispatch(voteAnecdote(anecdote))
		dispatch(notify(`You voted '${anecdote.content}'`))
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