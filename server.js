// initate 3rd parties and express server
const express = require('express'),
  path = require('path'),
  serveStatic = require('serve-static'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  Sequelize = require('sequelize'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  cors = require('cors')

const db = require('./models')
db.sequelize.sync().then(function () {
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
})

function onError (error) {
  console.log(error)
}
function onListening () {

}

// declaring the routes
var router = require('./router/index')

var corsOptions = {
  origin: ['https://trtvseries.herokuapp.com', 'http://localhost:8080'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// encryption
let crypto = require('crypto')
let algorithm = 'aes-256-ctr'
let password = 'mormon'

function encrypt (text) {
  let cipher = crypto.createCipher(algorithm, password)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt (text) {
  let decipher = crypto.createDecipher(algorithm, password)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

// login session
passport.serializeUser(function (user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    console.log('credentials: ', email, password)
    db.User.findOne({ where: {email: email} }).then(user => {
      console.log('response: ', user, encrypt(password))
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    })
  }
))

const app = express()
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(serveStatic(path.join(__dirname, '/dist')))
app.use(require('express-session')({ secret: 'pferd', resave: false, saveUninitialized: false }))
// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize())
app.use(passport.session())

// use routes
app.use('/api', router)

app.post('/login', function (req, res, next) {
  //  console.log(req.body, 'req.body')
  passport.authenticate('local',
  function (err, user) {
    // console.log('user', user)
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).end('There is no user register with that email')
    }
    if (user.password !== encrypt(req.body.password)) {
      return res.status(401).end('The password is incorrect')
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.status(200).send(JSON.stringify(user, null, 2))
    })
  })(req, res, next)
})

app.post('/register', function (req, res, next) {
  let theUser = req.body
  theUser.password = encrypt(theUser.password)
  console.log('theUser', theUser)
  db.User.findOne({ where: {email: theUser.email} }).then(euser => {
    if (euser !== null) {
      return res.status(400).end('User already exist')
    } else {
      db.User.create(theUser).then(user => {
        return res.status(200).send(JSON.stringify(user, null, 2))
      }).catch(function (err) {
        console.error('couldnt create user', err)
        return res.status(500).send(err)
      })
    }
  })
})

app.get('/logout',
  function (req, res) {
    req.logout()
    res.redirect('/')
  })

var port = process.env.PORT || 5000

const server = app.listen(port, function () {
  console.log('Listening on port ' + port)
})

module.exports = app
