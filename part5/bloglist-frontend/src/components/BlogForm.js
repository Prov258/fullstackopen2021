import React, { useState } from 'react'

const BlogForm = (props) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlogHandler = (e) => {
		e.preventDefault()
		props.addBlog({ title, author, url })

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={createBlogHandler}>
				<div>
					<label>
						<span>title: </span>
						<input
							id='title'
							type='text'
							name='title'
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						<span>author: </span>
						<input
							id='author'
							type='text'
							name='author'
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						<span>url: </span>
						<input
							id='url'
							type='url'
							name='url'
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
					</label>
				</div>
				<button type='submit'>create</button>
			</form>
		</>
	)
}

export default BlogForm