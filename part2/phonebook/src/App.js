import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNames, setFilterNames ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  const submitNumberHandler = (e) => {
    e.preventDefault();
    if(!persons.find(person => person.name === newName)){
      const newPersons = [...persons, {name: newName, number: newNumber}];
      setPersons(newPersons);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputValue={filterNames} inputChange={(e) => setFilterNames(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={submitNumberHandler} 
        nameValue={newName}
        onChangeName={(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        onChangeNumber={(e) => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterNames={filterNames} />
    </div>
  )
}

export default App
