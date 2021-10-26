import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className='blogs__item'>
      <div>{blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button></div>
      {visible
        ? <>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button>like</button></div>
            <div>{blog.user.name}</div>
          </>
        : null 
      }
    </div> 
  ) 
}

export default Blog