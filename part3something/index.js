const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

let entries = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) =>{
  response.send(entries)
})
app.get('/api/person/:id', (request, response) =>{
  const id = request.params.id
  const entry = entries.find(entry => entry.id === id)
  if (entry) {
    response.send(entry)
  } else {
    response.status(404).send({ error: 'Entry not found' })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  entries = entries.filter(entry => entry.id !== id)
  response.status(204).end()
})

app.post('/api/person', (request, response) =>{
  const newEntry = request.body
  if (!newEntry.name || !newEntry.number) {
    return response.status(400).json({ error: 'Name or number missing' })
  }
  const existingEntry = entries.find(entry => entry.name === newEntry.name)
  if (existingEntry) {
    return response.status(400).json({ error: 'Name must be unique' })
  }
  newEntry.id = (Math.random() * 1000).toString()
  entries.push(newEntry)
  response.status(201).json(newEntry)
})

app.put('/api/person/:id', (request, response) =>{
  const id = request.params.id
  const updatedEntry = request.body
  if (!updatedEntry.name || !updatedEntry.number) {
    return response.status(400).json({ error: 'Name or number missing' })
  }
  const existingEntry = entries.find(entry => entry.id === id)
  if (!existingEntry) {
    return response.status(404).json({ error: 'Entry not found' })
  }
  existingEntry.name = updatedEntry.name
  existingEntry.number = updatedEntry.number
  response.json(existingEntry)
}
)


app.get('/info', (request, response) =>{
  var currentdate = new Date(); 
  var datetime = "Time: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  response.send("<p>Phonebook has " + entries.length + " people</p><p>"+datetime+"</p>")
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})