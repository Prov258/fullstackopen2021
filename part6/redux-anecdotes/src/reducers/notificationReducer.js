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

export const notify = (message) => {
    return {
        type: 'NOTIFY',
        data: { message }
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default reducer