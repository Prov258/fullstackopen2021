import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, showNotification, user }) => {
	const [visible, setVisible] = useState(false)

	const updateLikes = async () => {
		try{
			const updatedBlog = await blogService.update(blog.id, { ...blog, likes: ++blog.likes })
			setBlogs(blogs.map(b => b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b))
		} catch(exception){
			console.log(exception)
			showNotification('Something went wrong', 'red')
		}
	}

	const deleteBlogHandler = async () => {
		if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
			try{
				await blogService.remove(blog.id)
				setBlogs(blogs.filter(b => b.id !== blog.id))
				showNotification(`blog ${blog.title} by ${blog.author} deleted`)
			} catch(exception){
				console.log(exception)
				showNotification('Something went wrong', 'red')
			}
		}
	}

	return (
		<div className='blogs__item'>
			<div className='blogs__item-header'>{blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button></div>
			{visible
				? <div className='blogs__item-info'>
					<div>{blog.url}</div>
					<div>likes {blog.likes} <button onClick={updateLikes}>like</button></div>
					<div>{blog.user.name}</div>
					{user.username === blog.user.username && <button onClick={deleteBlogHandler}>remove</button>}
				</div>
				: null
			}
		</div>
	)
}

export default Blog