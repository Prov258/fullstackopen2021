import React from "react";

const Person = (props) => {
    return (
        <li><span>{props.person.name}: {props.person.number} </span><button onClick={props.deleteNumberHandler} >delete</button></li>
    )
}

export default Person;