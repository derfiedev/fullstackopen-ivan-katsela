import { useState, useEffect } from 'react'
import axios from 'axios'
import { ViewPersons } from './components/ViewPersons'
import { Filter } from './components/Filter'
import { AddNewPerson } from './components/AddNewPerson'

const url = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [increment, setIncrement] = useState(1)

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setPersons(response.data)
        setIncrement(response.data.length + 1)
      })
  }, [])

  const handleClick = (event) => {
    const id = parseInt(event.target.value)
    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <AddNewPerson 
        persons={persons} 
        setPersons={setPersons} 
        newName={newName} 
        setNewName={setNewName} 
        newPhone={newPhone} 
        setNewPhone={setNewPhone} 
        increment={increment} 
        setIncrement={setIncrement} 
      />
      <ViewPersons persons={persons} handleClick={handleClick} filter={filter} />
    </div>
  )
}

export default App
