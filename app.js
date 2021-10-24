const express = require('express');
const session = require('express-session')
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes/index')
const userPassport = require('./config/passport')
require('./config/mongoose')

const app = express();
const port = process.env.PORT;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(flash())
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

userPassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.loginCheck_msg = req.flash('loginCheck_msg')
  res.locals.editCheck_msg = req.flash('editCheck_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
