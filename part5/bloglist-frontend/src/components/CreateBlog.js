import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogHandler = async (e) => {
    e.preventDefault()

    try{
      const createdBlog = await blogService.create({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')
      props.setBlogs(props.blogs.concat(createdBlog))
      props.showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)

    } catch(exception){
      alert(exception)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlogHandler}>
        <div>
          <label>
            <span>title: </span>
            <input 
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

export default CreateBlog