import React from 'react'
import Blog from './Blog'

const Blogs = (props) => {
	return (
		<div>
			{props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					blogs={props.blogs}
					setBlogs={props.setBlogs}
					showNotification={props.showNotification}
					user={props.user}
				/>
			)}
		</div>
	)
}

export default Blogs