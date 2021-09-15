import React from "react";
import Person from "./Person";

const Persons = ({ persons, filterNames }) => {

    const displayPersonsHandler = (person) => {
        return person.name.toLowerCase().includes(filterNames.toLowerCase())
          ? <Person key={person.name} person={person} />
          : null
    }

    return (
        <ul>
            {persons.map(displayPersonsHandler)}
        </ul>
    )
}

export default Persons;