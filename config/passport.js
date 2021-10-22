const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: '此帳號不存在'})
      }
      if (user.password !== password) {
        return done(null, false, { message: '密碼與確認密碼不相符'})
      }
      return done(null, user)
     })
     .catch(err => done(err, false))
  }))
}

passport.serializeUser((user, done) => {
   done(null, user.id)
})

passport.deserializeUser((id, done) => {
   User.findById(id)
     .lean()
     .then(user => done(null, user))
     .catch(err => done(err, null))
})