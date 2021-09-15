import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "040-1234567" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
        {persons.map(person => <li key={person.name}>{person.name}: {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App
