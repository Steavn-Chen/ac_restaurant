const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
require('./config/mongoose')

const app = express();

const port = 3100;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.use(routes)
// app.get('/sort/:action/:method', (req, res) => {
  app.get('/sort/name/asc', (req, res) => {
  console.log(req.params)
  res.render('list')
})
app.listen(port, () => {
  console.log(`Express is running on http://locahost:${port}`);
});
