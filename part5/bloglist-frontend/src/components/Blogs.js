import React from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const Blogs = (props) => {
  return (
    <>
      <h2>blogs</h2>
      <h4>{props.user.name} logged-in <button onClick={props.handleLogout}>logout</button></h4>
      <CreateBlog setBlogs={props.setBlogs} blogs={props.blogs} showNotification={props.showNotification} />
      {props.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
      
    </>
  )
}

export default Blogs