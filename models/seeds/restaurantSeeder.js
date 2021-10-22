const resData = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')


db.once('open', () => {
  console.log('mongodb is connected!')
  for (let i = 0; i < resData.results.length; i++) {
    Restaurant.create(resData.results[i])
  }
  console.log('done!')
})
