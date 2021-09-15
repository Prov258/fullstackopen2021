import React, { useState } from 'react'

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

  const showPhonebook = (person) => {
      return person.name.toLowerCase().includes(filterNames.toLowerCase())
        ? <li key={person.name}>{person.name}: {person.number}</li>
        : null
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with
          <input value={filterNames} onChange={(e) => setFilterNames(e.target.value)} />
        </div>
      <h2>add a new</h2>
      <form onSubmit={submitNumberHandler} >
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(showPhonebook)}
      </ul>
    </div>
  )
}

export default App
