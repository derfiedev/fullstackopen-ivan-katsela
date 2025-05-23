import { useState, useEffect } from 'react'
import axios from 'axios'
import { ViewPersons } from './components/ViewPersons'
import { Filter } from './components/Filter'
import { AddNewPerson } from './components/AddNewPerson'
import { Notification } from './components/Notification'
import './index.css'

const url = 'http://localhost:3001/api/persons' 

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [increment, setIncrement] = useState(1)

  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setPersons(response.data)
        
      })
  }, [])

  const handleClick = (event) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return
    const id = event.target.value
    console.log('Attempting to delete person with id:', id)

    const personExists = persons.some(person => person.id === id)
    if (!personExists) {
      alert('Error: Person not found in the local state')
      return
    }

    axios.delete(`${url}/${id}`)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setNotificationType('success')
        setNotification('Person deleted successfully')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          alert('Error: Person not found on the server')
          setPersons(persons.filter(person => person.id !== id))
          setNotificationType('error')
          setNotification('Person not found on the server')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        } else {
          console.error('Error deleting person:', error)
        }
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <Notification type={notificationType} message={notification} />
      <AddNewPerson 
        persons={persons} 
        setPersons={setPersons} 
        newName={newName} 
        setNewName={setNewName} 
        newPhone={newPhone} 
        setNewPhone={setNewPhone} 

      />
      <ViewPersons persons={persons} handleClick={handleClick} filter={filter} />
    </div>
  )
}

export default App
