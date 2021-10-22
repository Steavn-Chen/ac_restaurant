const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const newData = req.body
  Restaurant.create(newData)
  res.redirect('/')
})

router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('show', { restaurant }))
  .catch(error => console.log(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('edit', { restaurant }))
  .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const body = req.body

  return Restaurant.findById(id)
  .then(restaurant => {
      Object.assign(restaurant, body).save()
  })
  .then(() => res.redirect(`/restaurants/${id}/edit`))
  .catch(error => console.log(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  console.log(id)
  Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

module.exports = router