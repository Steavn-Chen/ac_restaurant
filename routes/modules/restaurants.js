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
  // res.render('new')
})

router.get("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('show',{restaurant}))
  .catch(error => console.log(error))
   
  // const restaurant = restaurantList.results.find((item) => {
  //   return item.id.toString() === restaurant_id;
  // });
  // res.render("show", { restaurant: restaurant });
});

router.get("/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('edit',{restaurant}))
  .catch(error => console.log(error))
   
  // const restaurant = restaurantList.results.find((item) => {
  //   return item.id.toString() === restaurant_id;
  // });
  // res.render("show", { restaurant: restaurant });
});

router.put("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  const body = req.body

  // 第一種寫法解購函式
  // const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // return Restaurant.findById(id)
  // .then(restaurant => {
  //   restaurant.name = name,
  //   restaurant.name_en = name_en,
  //   restaurant.category = category,
  //   restaurant.image = image,
  //   restaurant.location = location,
  //   restaurant.phone = phone,
  //   restaurant.google_map = google_map,
  //   restaurant.rating = rating,
  //   restaurant.description = description
  //   return restaurant.save() 
  // })

  // 第二種物件合併
  return Restaurant.findById(id)
  .then(restaurant=> { 
      Object.assign(restaurant,body).save() 
  })
  .then(()=> res.redirect(`/restaurants/${id}/edit`))
  .catch(error => console.log(error))
});

router.delete('/:restaurant_id', (req, res)=> {
  const id = req.params.restaurant_id
  console.log(id)
  Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.log(error)) 
})

module.exports = router