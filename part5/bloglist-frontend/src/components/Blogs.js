import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs, showNotification, user }) => {

	const updateLikes = async (blog) => {
		try{
			const updatedBlog = await blogService.update(blog.id, { ...blog, likes: ++blog.likes })
			setBlogs(blogs.map(b => b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b))
		} catch(exception){
			console.log(exception)
			showNotification('Something went wrong', 'red')
		}
	}

	const deleteBlogHandler = async (blog) => {
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
		<div>
			{blogs.sort((a, b) => b.likes - a.likes).map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					updateLikes={updateLikes}
					deleteBlogHandler={deleteBlogHandler}
					user={user}
				/>
			)}
		</div>
	)
}

export default Blogs