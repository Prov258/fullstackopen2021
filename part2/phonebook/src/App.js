import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberService from './services/numbers'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterNames, setFilterNames ] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(data => {
        setPersons(data);
      })
  }, []);

  const submitNumberHandler = (e) => {
    e.preventDefault();
    if(!persons.find(person => person.name === newName)){
      numberService
        .create({name: newName, number: newNumber})
        .then(data => setPersons(persons.concat(data)))
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteNumberHandler = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)){
      numberService
      .remove(id)
      .then(response => {
        if(response.status === 200){
          setPersons(persons.filter(person => person.id !== id));
        }
      })
    }
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
      <Persons persons={persons} filterNames={filterNames} deleteNumberHandler={deleteNumberHandler} />
    </div>
  )
}

export default App
