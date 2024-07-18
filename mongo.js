import mongoose from 'mongoose';

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://khanhgaming3:${password}@fullstack.taeij8d.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Fullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: `${process.argv[3]}`,
  number: `${process.argv[4]}`,
})

if (process.argv.length<5){
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log("phonebook:")
      console.log(`${note.name} ${note.number}`)
    })
    mongoose.connection.close()
  })
}

else{
  note.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}
