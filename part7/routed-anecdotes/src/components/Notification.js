import React from 'react'

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

export default Notification