import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Nimi')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleDelete = (value) => {
    if (window.confirm(`Delete ${value}?`) === true) {
      const id = persons.find(x => x.name === value).id
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(x => x.id !== id))
        })
    }
  }

  const numbersToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    const inList = persons.filter(person => person.name === newName)

    if (inList.length === 1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
        const id = persons.find(x => x.name === newName).id
        personService
          .update(id, {name:newName, number: newNumber})
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : {name:person.name, number:newNumber}))
          })
      } 
    } else {
      personService
        .create({name: newName, number: newNumber})
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} handleDelete={handleDelete} />
    </div>
  )

}

export default App