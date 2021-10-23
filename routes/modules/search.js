const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  let keyword = req.query.keyword.trim()
  if (!keyword) { keyword = null }
     Restaurant.find({ $or: [{ name: { $regex: `${keyword}`, $options: 'i' }, userId }, { category: { $regex: `${keyword}`, $options: 'i' }, userId }] })
  .lean()
  .then(restaurants => {
    if (restaurants.length) return res.render('index', { restaurants, keyword }) 
    return res.render('searchOut', { keyword })
  })
  .catch(error => console.log(error))
})

module.exports = router