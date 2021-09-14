import React from "react";

const Header = (props) => {
    return (
        <h2>{props.courseName}</h2>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => {
                return <Part part={part.name} exercises={part.exercises} key={part.id} />
            })}
        </div>
    )
}

const Total = ({ parts }) => {
    return (
        <p><strong>total of {parts.reduce((sum, current) => sum + current.exercises, 0)} exercises</strong></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;