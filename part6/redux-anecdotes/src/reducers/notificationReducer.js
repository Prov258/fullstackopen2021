const reducer = (state = null, action) => {
    switch(action.type) {
        case 'NOTIFY':
            return {
                message: action.data.message,
                timeoutID: action.data.timeoutID
            } 
        case 'REMOVE':
            return null
        default:
            return state
    }
}

export const notify = (message, timer = 5) => {
    return async (dispatch, getState) => {
        const { notification } = getState()
        if(notification){
            clearTimeout(notification.timeoutID)
        }
        const timeoutID = setTimeout(() => {
            dispatch(removeNotification())
        }, timer * 1000)
        dispatch(setNotification(message, timeoutID))
    }
}

const setNotification = (message, timeoutID) => {
    return {
        type: 'NOTIFY',
        data: { message, timeoutID }
    }
}

const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default reducer