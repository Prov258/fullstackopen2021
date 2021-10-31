import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
	return (
		<>
			<h2>Login in to application</h2>
			<form onSubmit={props.handleLogin}>
				<div>
					<label>
						<span>username </span>
						<input
							id='username'
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
							id='password'
							type='password'
							name='Password'
							value={props.password}
							onChange={({ target }) => props.setPassword(target.value)}
						/>
					</label>
				</div>
				<button id='login-button' type='submit'>login</button>
			</form>
		</>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm