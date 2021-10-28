import React, { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlogHandler }) => {
	const [visible, setVisible] = useState(false)

	return (
		<div className='blogs__item'>
			<div className='blogs__item-header'>{blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button></div>
			{visible
				? <div className='blogs__item-info'>
					<div>{blog.url}</div>
					<div>likes {blog.likes} <button onClick={() => updateLikes(blog)} className='blogs__item-like-btn'>like</button></div>
					<div>{blog.user.name}</div>
					{user.username === blog.user.username && <button onClick={() => deleteBlogHandler(blog)}>remove</button>}
				</div>
				: null
			}
		</div>
	)
}

export default Blog