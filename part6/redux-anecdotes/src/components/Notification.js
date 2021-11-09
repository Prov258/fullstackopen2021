import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {

  if(!notification){
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification?.message
  }
}

export default connect(
  mapStateToProps
)(Notification)