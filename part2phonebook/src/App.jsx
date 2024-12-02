import { useState } from 'react'

import { ViewPersons } from './components/ViewPersons'
import { Filter } from './components/Filter'
import { AddNewPerson } from './components/AddNewPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('')

  const [increment, setIncrement] = useState(persons.length + 1)

  const handleClick = (event) => {
    const id = parseInt(event.target.value)
    setPersons(persons.filter(person => person.id !== id))
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>

      <AddNewPerson persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} increment={increment} setIncrement={setIncrement}/>


      <ViewPersons persons={persons} handleClick={handleClick} filter={filter}/>
    </div>
  )
}

export default App