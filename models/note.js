const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URL


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const noteSchema = new mongoose.Schema({
    id: String,
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      minLength: 8,
      validate:{
        validator: function(v){
          return /\d{2,3}-\d+/.test(v)
        },
        message: "Oops, not a phone number",
        // validator: function(x){
        //   return /\d{3}-\d{8}/.test(x)
        // },
        // message: "Oops, not a phone number, either",
      }
    },
  })

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    realid = returnedObject.id
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)