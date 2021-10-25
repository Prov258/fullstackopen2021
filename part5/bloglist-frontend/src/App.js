import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ notification, setNotification ] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (content, color = "green") => {
    setNotification({ content, color })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (newBlog) => {
    const addedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(addedBlog))
    showNotification(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
    blogFormRef.current.toggleVisibility()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception){
      console.log(exception)
      showNotification('Wrong credentials', 'red')
    }
  }

  const handleLogout = () => {
    if(user){
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null
        ? <LoginForm 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        :  <div>
            <h4>{user.name} logged-in <button onClick={handleLogout}>logout</button></h4>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm setBlogs={setBlogs} addBlog={addBlog} />
            </Togglable>
            <Blogs blogs={blogs} />
          </div>
      }
    </div>
  )
}

export default App