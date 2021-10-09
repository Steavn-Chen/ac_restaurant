const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-list-n1', { useNewUrlParser: true,useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose is error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db