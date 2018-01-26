// initate 3rd parties and express server
const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cors = require('cors')
const exphbs  = require('express-handlebars')
const mailer = require('express-mailer')

const db = require('./models')
db.sequelize
.sync()
.then(function () {
  console.log('Sync DB ' + port);
}).catch(function (e) {
  throw new Error(e);
})

// declaring the routes
var router = require('./router/index')
var user = require('./router/user')
var serie = require('./router/serie')
var episode = require('./router/episode')
var order = require('./router/order')

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

// login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    console.log('credentials: ', email, password)
    db.User.findOne({ where: {email: email} }).then(user => {
      // console.log('response: ' , user)
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    })
  }
))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(serveStatic(path.join(__dirname, '/dist')))
// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize())

// mail
mailer.extend(app, {
  from: 'trttv',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: process.env.GMAILEMAIL,
    pass: process.env.GMAILPASS
  }
})

console.log(process.env.GMAILEMAIL, process.env.GMAILPASS);

app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', exphbs());
app.set('view engine', 'hbs')
// use routes
app.use('/api', router)
app.use('/user', user)
app.use('/serie', serie)
app.use('/episode', episode)
app.use('/order', order)

// app.get('/hack', function(req, res, next) {
//   console.log(decrypt('f821524f8d901120af'))
// })

app.post('/login', function (req, res, next) {
  console.log(req.body, 'req.body')
  passport.authenticate('local', { session: false }, 
  function (err, user) {
    // console.log('user', user)
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).end('There is no user register with that email')
    }
    if (user.password !== encrypt(req.body.password)) {
      // console.log(user.password, encrypt(req.body.password))
      return res.status(401).end('The password is incorrect')
    }
    return res.status(200).send(JSON.stringify(user, null, 2))
  })(req, res, next)
})

app.post('/facebook/auth', function (req, res, next) {
  console.log(req.body)
  const email = req.body.email
  db.User.findOne({ where: {email: email} }).then((user) => {
    if (!user) {
      db.User.create({ email: email, name: req.body.name, password: encrypt(req.body.id), country: 'NL', admin: false }).then(cuser => {
        if (!cuser) {
          return res.status(400).end('couldnt create an user with those parameters')
        }
        return res.status(200).send(JSON.stringify(cuser, null, 2))
      }).catch(function (err) {
        console.error('error creating a user with those values', err)
        return res.status(500).send(err)
      })
    } else {
      return res.status(200).send(JSON.stringify(user, null, 2))
    }
  }).catch(function (err) {
    console.error('error geting a user with that email', err)
    return res.status(500).send(err)
  })
})

app.post('/recover', function (req, res, next) {
  const email = req.body.email
  db.User.findOne({ where: {email: email} }).then(user => {
    if (!user) {
      return res.status(400).end('couldnt get a user with that email')
    }
    const pass = decrypt(user.password)
    app.mailer.send('password', {
      to: user.email,
      subject: 'password recovery for TRTTV',
      user: user,
      password: pass
    }, function (err) {
      if (err) {
        console.log('There was an error sending the email', err)
        return res.status(500).send(err)
      } else {
        return res.status(200).send(JSON.stringify(user.name, null, 2))
      }
    })
  }).catch(function (err) {
    console.error('error geting a user with that email', err)
    return res.status(500).send(err)
  })
})

app.post('/register', function (req, res, next) {
  let theUser = req.body
  theUser.password = encrypt(theUser.password)
  // console.log('theUser', theUser)
  db.User.findOne({ where: {email: theUser.email} }).then(euser => {
    if (euser !== null) {
      return res.status(400).end('User already exist')
    } else {
      db.User.create(theUser).then(user => {
        app.mailer.send('registration', {
          to: user.email,
          subject: 'Welcome to TRTTV',
          user: theUser,
          password: decrypt(theUser.password)
        }, function (err) {
          if (err) {
            console.log('There was an error sending the email', err)
          }
        })
        return res.status(200).send(JSON.stringify(user, null, 2))
      }).catch(function (err) {
        console.error('couldnt create user', err)
        return res.status(500).send(err)
      })
    }
  })
})

app.get('/mailchecker', function(req, res, next){
  res.render('registration', { title: 'registration', user: {name: 'fabian'} })
})

app.post('/dashboard/:id/update', function (req, res, next) {
  // console.log('post dashboard', req.body)
  db.Dashboard.update(req.body, { where: {id: req.params.id}, returning: true }).then(serie => {
    // console.log('update: ', serie)
    if (!serie[1][0]) {
      return res.status(401).end('No main series updated')
    }
    return res.status(200).send(serie[1][0])
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

app.get('/dashboard', function (req, res, next) {
  db.Dashboard.findAll().then(dash => {
    if (!dash) {
      return res.status(401).end('No dash found')
    }
    return db.Serie.findOne({where : {id: dash[0].main_serie_id}}).then(serie => {
      // console.log('response: ', serie)
      if (!dash) {
        return res.status(401).end('No dash found')
      }
      return res.status(200).send(JSON.stringify(serie,null,2))
    })
    .catch(function (err) {
      console.error('couldnt get a serie', err)
      return res.status(500).send(err)
    })
  })
  .catch(function (err) {
    console.error('couldnt get a dash', err)
    return res.status(500).send(err)
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
