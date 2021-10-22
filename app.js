const express = require('express');
const session = require('express-session')
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/index')

const userPassport = require('./config/passport')
require('./config/mongoose')

const app = express();
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

userPassport(app)

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://locahost:${port}`);
});
