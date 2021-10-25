import React from "react"

const LoginForm = (props) => {
    return (
      <>
        <h2>Login in to application</h2>
        <form onSubmit={props.handleLogin}>
            <div>
            <label>
                <span>username </span>
                <input
                  type='text'
                  name='Username'
                  value={props.username}
                  onChange={({ target }) => props.setUsername(target.value)}
                />
            </label>
            </div>
            <div>
            <label>
                <span>password </span>
                <input 
                  type='password'
                  name='Password'
                  value={props.password}
                  onChange={({ target }) => props.setPassword(target.value)}
                />
            </label>
            </div>
            <button type='submit'>login</button>
        </form>
      </>
    )
}

export default LoginForm