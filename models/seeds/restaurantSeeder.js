const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const resData = require('../../restaurant.json')
const db = require('../../config/mongoose')
const User = require('../user')
const Restaurant = require('../restaurant')

const SEED_USER = [
  { name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  { name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  console.log('mongodb is connected!') 
  SEED_USER.forEach((item, index) => {
    bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(item.password, salt))
    .then(hash =>  User.create({
      name: item.name,
      email: item.email,
      password: hash
    }))  
     .then(user => { 
      const userId = user._id
      return Promise.all(Array.from({ length: 3 }, (_, i) => Restaurant.create({ ...resData.results[index * 3 + i], userId
      })))
    }) 
    .then(() => {
    console.log('done')
     process.exit()
   })
  })
})




