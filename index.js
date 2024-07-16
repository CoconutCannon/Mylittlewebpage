import express from 'express'
var app = express()

import cors from 'cors';
app.use(cors());
app.use(express.json())

let notes = [
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

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.statusMessage = "Skidibi sigma rizz sigma mewing";
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
    const date = new Date()
    const info = `Phonebook has info for ${notes.length} people`
    response.send(`<p>${info}<br> ${date}</p>`)
  })

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', express.urlencoded({extended: true}), (request, response) => {
  const body = request.body
  const names = notes.map((value) => value.name)

  if (!body.name || !body.number) {
    return response.status(418).json({ 
      error: 'Please, my friend, write sum in here would ya' 
    })
  }

  if (names.includes(body.name)) {
    return response.status(400).json({ 
      error: '!' 
    })
  }

  const note = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})