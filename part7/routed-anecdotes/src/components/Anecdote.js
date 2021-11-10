import React from 'react'

const Anecdote = ({ anecdote }) => {
    return (
        <div style={{ marginBottom: 20 }}>
            <h2>{anecdote.content}</h2>
            <div>has {anecdote.votes} votes</div>
            <div>for more info see 
                <a href={anecdote.info}> {anecdote.info}</a>
            </div>
        </div>
    )
}

export default Anecdote