const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const restaurantList = require("./restaurant.json");
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const app = express();

const port = 3100;

mongoose.connect('mongodb://localhost/restaurant-list-n1', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb is error')
})

db.once('open', () => {
  console.log('mongodb is connected!')
})

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}))

app.get("/", (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.log(error))
  // res.render("index", { restaurants: restaurantList.results });
});

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants/new', (req, res) => {
  const newData = req.body
  Restaurant.create(newData)
  res.redirect('/')
  // res.render('new')
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim()
  console.log(keyword)
  // 第一種方法
  // const regex = new RegExp( keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi')
  // console.log(regex,typeof regex)
  // Restaurant.find({$or:[{name: regex},{category: regex}]})
  // .lean()
  // .then(restaurants => { if (restaurants.length) return res.render('index', { restaurants ,keyword}) 
  //   return res.render('searchOut',{ keyword})
  // })
  // .catch(error => console.log(error))  

// 第二種mongoose語法
   Restaurant.find({$or:[{ name:{$regex: `${keyword}`, $options: 'i' } },{ category:{$regex: `${keyword}`, $options: 'i' } }]})
  .lean()
  .then(restaurants => { if (restaurants.length) return res.render('index', { restaurants ,keyword}) 
    return res.render('searchOut',{ keyword})
  })
  .catch(error => console.log(error)) 
  // const restaurants = restaurantList.results.filter(function (item) {
  //   return item.name.toLowerCase().includes(keyword.toLowerCase()) ||
  //     item.category.toLowerCase().includes(keyword.toLowerCase())
  // });
  // res.render("index", { restaurants: restaurants, keyword: keyword });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
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

app.get("/restaurants/:restaurant_id/edit", (req, res) => {
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

app.post("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id;
  const body = req.body
  // console.log(body)
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
  // .lean()
  .then(restaurant => {
    restaurant.name = name,
    restaurant.name_en = name_en,
    restaurant.category = category,
    restaurant.image = image,
    restaurant.location = location,
    restaurant.phone = phone,
    restaurant.google_map = google_map,
    restaurant.rating = rating,
    restaurant.description = description
    return restaurant.save()
    // console.log(restaurant.name)
    // res.render('edit',{ restaurant })
  })
  .then(restaurant => {
    // console.log(restaurant)
    res.redirect(`/restaurants/${id}/edit`)
  })
  .catch(error => console.log(error))
});

app.listen(port, () => {
  console.log(`Express is running on http://locahost:${port}`);
});
