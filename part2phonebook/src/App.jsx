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
        const maxId = response.data.reduce((max, person) => person.id > max ? person.id : max, 0)
        setIncrement(maxId + 1)
            })
  }, [])

  const handleClick = (event) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return
    const id = event.target.value // Keep id as a string
    console.log('Attempting to delete person with id:', id)

    const personExists = persons.some(person => person.id === id)
    if (!personExists) {
      alert('Error: Person not found in the local state')
      return
    }

    // Update the state before making the delete request
    setPersons(persons.filter(person => person.id !== id))

    axios.delete(`${url}/${id}`)
      .then(response => {
        console.log('Person deleted successfully', response)
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response:', error.response)
          if (error.response.status === 404) {
            alert('Error: Person not found on the server')
          } else {
            console.error('Error deleting person:', error)
          }
        } else {
          console.error('Error deleting person:', error)
        }
      })
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
