import React from 'react'

const Notification = ({ notification }) => {
	if(!notification){
		return null
	}

	const notificationStyle = {
		border: '5px solid',
		borderColor: notification.color,
		padding: '10px',
		display: 'inline-block',
		marginBottom: '10px',
		minWidth: '200px',
		fontSize: '18px',
		fontWeight: '700',
		backgroundColor: 'lightgray'
	}

	return <div style={notificationStyle}>{notification.content}</div>
}

export default Notification