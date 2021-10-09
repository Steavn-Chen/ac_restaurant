const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
require('./config/mongoose')
// const restaurantList = require("./restaurant.json");
// const Restaurant = require('./models/restaurant')
// const mongoose = require('mongoose')
const app = express();

const port = 3100;

// mongoose.connect('mongodb://localhost/restaurant-list-n1', { useNewUrlParser: true, useUnifiedTopology: true })

// const db = mongoose.connection

// db.on('error', () => {
//   console.log('mongodb is error')
// })

// db.once('open', () => {
//   console.log('mongodb is connected!')
// })

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://locahost:${port}`);
});
