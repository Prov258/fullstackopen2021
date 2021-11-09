import React from 'react'
import { connect } from 'react-redux'
import { writeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const style = {
        marginBottom: 10
    }

    const filterHandler = (e) => {
        props.writeFilter(e.target.value)
    }

    return (
        <div style={style} >
            <span>filter </span>
            <input onChange={filterHandler} />
        </div>
    )
}

export default connect(
    null,
    { writeFilter }
)(Filter)