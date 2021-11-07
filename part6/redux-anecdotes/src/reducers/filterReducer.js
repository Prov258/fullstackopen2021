const reducer = (state = null, action) => {
    switch(action.type){
        case 'WRITE':
            return action.data.value
        default:
            return state
    }
}

export const writeFilter = (value) => {
    return {
        type: 'WRITE',
        data: { value }
    }
}

export default reducer