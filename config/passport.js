const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github-oauth20').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ 
    usernameField: 'email',
    passReqToCallback: true 
  }, (req, email, password, done) => {
    User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, req.flash('loginCheck_msg', '此帳號不存在'))
      }
      return bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return done(null, false, req.flash('loginCheck_msg', '輸入的密碼有錯，請輸入正確的密碼'))
        }
        return done(null, user)
      }) 
     })
     .catch(err => done(err, false))
  }))
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
      profileFields: ['displayName', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      const { name, email } = profile._json
      const randomPassword = Math.random().toString(36).slice(-10)
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(randomPassword, salt))
        .then((hash) => {
          return User.findOrCreate(
            { email },
            { email, name, password: hash },
            (err, user) => {
              return done(err, user)
            }
          )
        })
        .catch((err) => done(err, false))
    }
  )
)
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      const randomPassword = Math.random().toString(36).slice(-8)
      const { login, emails } = profile._json
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(randomPassword, salt))
        .then((hash) => {
          User.findOrCreate(
            { email: emails[0].value },
            { email: emails[0].value, name: login, password: hash },
            (err, user) => {
              return done(err, user)
            }
          )
        })
    }
  )
)

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  const { name, email } = profile._json
  User.findOne({ email })
  .then(user => {
    if (user) return done(null, user)
    const randomPassword = Math.random().toString(36).slice(-8)
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(randomPassword, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}
))

passport.serializeUser((user, done) => {
   done(null, user.id)
})

passport.deserializeUser((id, done) => {
   User.findById(id)
     .lean()
     .then(user => done(null, user))
     .catch(err => done(err, null))
})