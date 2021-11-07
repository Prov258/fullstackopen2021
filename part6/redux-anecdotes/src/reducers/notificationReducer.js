const reducer = (state = null, action) => {
    switch(action.type) {
        case 'NOTIFY':
            return action.data.message
        case 'REMOVE':
            return null
        default:
            return state
    }
}

export const notify = (message, timer = 5) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, timer * 1000)
    }
}

const setNotification = (message) => {
    return {
        type: 'NOTIFY',
        data: { message }
    }
}

const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default reducer