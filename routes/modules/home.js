const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => {
      const displayMode = 'card'
      res.render('index', { restaurants, displayMode })
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => {
      const displayMode = req.body.displayMode || 'card'
      res.render('index', { restaurants, displayMode })
    })
    .catch(error => console.log(error))
})

module.exports = router