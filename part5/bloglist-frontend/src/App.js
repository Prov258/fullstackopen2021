import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ notification, setNotification ] = useState(null)

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
      <Notification notification={notification} />
      {user === null
        ? <LoginForm 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        : <Blogs 
            blogs={blogs} 
            user={user} 
            handleLogout={handleLogout} 
            setBlogs={setBlogs}
            showNotification={showNotification} 
          />
      }
    </div>
  )
}

export default App