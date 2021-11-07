import React from 'react'
import { useDispatch } from 'react-redux'
import { writeFilter } from '../reducers/filterReducer'

const Filter = () => {
    const style = {
        marginBottom: 10
    }
    const dispatch = useDispatch()

    const filterHandler = (e) => {
        dispatch(writeFilter(e.target.value))
    }

    return (
        <div style={style} >
            <span>filter </span>
            <input onChange={filterHandler} />
        </div>
    )
}

export default Filter