// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/restaurant-list-n1', { useNewUrlParser: true, useUnifiedTopology: true })

const resData = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
// const db = mongoose.connection

// db.on('error', () => {
//   console.log('mongodb is error')
// })

db.once('open', () => {
  console.log('mongodb is connected!')

  // 第一種寫法
  // for (let i = 0; i < resData.results.length; i++) {
  //   Restaurant.create(
  //     {
  //       name: resData.results[i].name,
  //       name_en: resData.results[i].name_en,
  //       category: resData.results[i].category,
  //       image: resData.results[i].image,
  //       location: resData.results[i].location,
  //       phone: resData.results[i].phone,
  //       google_map: resData.results[i].google_map,
  //       rating: resData.results[i].rating,
  //       description: resData.results[i].description
  //     }
  //   )
  // }

  // 第二種
  for (let i = 0; i < resData.results.length; i++) {
    Restaurant.create(resData.results[i])
  }
  // 第三種
  // resData.results.forEach((item) => {
  //   return Restaurant.create(item)
  // })
  console.log('done!')
})
