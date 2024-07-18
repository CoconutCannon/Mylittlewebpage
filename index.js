require("dotenv").config()
const express = require('express')
const Note = require('./models/note')
const app = express()
app.use(express.static('dist'))
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/persons', async (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Note.findById(request.params.id).then(info => {
    response.json(info)
  })
})

app.get('/info', (request, response) => {
    const date = new Date()
    const info = `Phonebook has info for ${notes.length} people`
    response.send(`<p>${info}<br> ${date}</p>`)
  })

app.delete('/api/persons/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', express.urlencoded({ extended: true }) , async (request, response) => {
  const body = request.body
  const number = await Note.countDocuments({})
  // const names = Note.map(info => info.name)

  const maxId = parseInt(number) > 0
    ? parseInt(number)
    : 0

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: request.body.name })
  }
  // if (names.includes(body.name)){
  //   return response.status(418).json({ error: "I am not a teapot 😆"})
  // }

  const info = new Note({
    name: body.name,
    number: body.number,
    id: maxId + 1,
  })

  info.save().then(savedName => {
    response.json(savedName)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})