import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNames, setFilterNames ] = useState('')

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
