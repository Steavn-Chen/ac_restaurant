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
app.use(bodyParser.urlencoded({ extend: true}))


app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
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
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(function (item) {
    return (
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const restaurant = restaurantList.results.find((item) => {
    return item.id.toString() === restaurant_id;
  });
  res.render("show", { restaurant: restaurant });
});
app.listen(port, () => {
  console.log(`Express is running on http://locahost:${port}`);
});
