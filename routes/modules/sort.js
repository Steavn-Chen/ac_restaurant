const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  Restaurant.find()
    .lean()
    .sort({ [type]: method })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/list/:type/:method', (req, res) => {
  const { type, method } = req.params
  const result = { [type]: method }
  console.log(type, typeof type, [type], typeof [type], result)
  Restaurant.find()
  .lean()
  .sort(result)
  // .sort({ [type]: method})
  .then(restaurants => res.render('list', { restaurants }))
  .catch(error => console.log(error))
})

module.exports = router