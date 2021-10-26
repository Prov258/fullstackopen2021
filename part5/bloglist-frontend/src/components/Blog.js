import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, showNotification }) => {
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

  return (
    <div className='blogs__item'>
      <div>{blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button></div>
      {visible
        ? <>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button onClick={updateLikes}>like</button></div>
            <div>{blog.user.name}</div>
          </>
        : null 
      }
    </div> 
  ) 
}

export default Blog