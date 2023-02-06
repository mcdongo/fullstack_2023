import { useState } from 'react'

const Temp = ({text}) => {
  return (
    <div>debug : {text}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('Nimi')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const numbersToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    const inList = persons.filter(person => person.name === newName)

    if (inList.length >= 1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      console.log(persons)
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with 
          <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form  onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbersToShow.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )

}

export default App