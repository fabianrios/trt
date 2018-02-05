var express = require('express')
var router = express.Router()
const db = require('../models')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const mailer = require('express-mailer')

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

app.set('views', path.join(__dirname, '../views'))
app.engine('hbs', exphbs())
app.set('view engine', 'hbs')

router.get('/all', function (req, res, next) {
  db.User.findAll({
    attributes: ['id', 'name', 'email', 'image', 'address', 'country', 'bio', 'admin'],
    include: [{
      model: db.Episode,
      through: {
        where: {status: 'paid'}
      }
    },
    {
      model: db.Serie,
      through: {
        where: { status: 'paid' }
      }
    }]}
  ).then(users => {
    // console.log('response: ', user)
    if (!users) {
      return res.status(401).end('No users found')
    }
    return res.status(200).send(JSON.stringify(users, null, 2))
  }).catch(function (err) {
    console.error('couldnt get a users', err)
    return res.status(500).send(err)
  })
})

router.get('/:id', function (req, res, next) {
  db.User.findOne({ where: {id: req.params.id},
    attributes: ['id', 'name', 'email', 'image', 'address', 'country', 'bio', 'admin'],
    include: [{
      model: db.Episode,
      through: {
        where: {status: 'paid'}
      }
    },
    {
      model: db.Serie,
      through: {
        where: { status: 'paid' }
      }
    }] }).then(user => {
      // console.log('response: ', user)
      if (!user) {
        return res.status(401).end('No user found')
      }
      user.Series.map((ser) => {
        ser.dataValues.stars = ser.dataValues.UserSeries.stars
        return ser
      })
      return res.status(200).send(JSON.stringify(user, null, 2))
    })
    .catch(function (err) {
      console.error('couldnt get a user', err)
      return res.status(500).send(err)
    })
})

router.get('/:id/awaygifts', function (req, res, next) {
  db.Gifts.findAll({ where: {user_id: req.params.id, claim: false},
    include: [{
      model: db.Serie
    }]
  }).then(gifts => {
    if (!gifts) {
      return res.status(401).end('No gifts found')
    }
    return res.status(200).send(JSON.stringify(gifts, null, 2))
  })
  .catch(function (err) {
    console.error('couldnt get a user', err)
    return res.status(500).send(err)
  })
})

router.get('/:id/gifts', function (req, res, next) {
  db.User.findOne({ where: {id: req.params.id} }).then(user => {
    if (!user) {
      return res.status(401).end('No user found')
    }
    const email = user.email
    return db.Gifts.findAll({ where: {email: email, status: 'paid', claim: false },
      include: [{model: db.Serie}, {model: db.User, attributes: ['name', 'id', 'email']}] }).then(gifts => {
        if (!gifts) {
          return res.status(401).end('No gifts found')
        }
        return res.status(200).send(JSON.stringify(gifts, null, 2))
      })
      .catch(function (err) {
        console.error('couldnt get users series', err)
        return res.status(500).send(err)
      })
  })
  .catch(function (err) {
    console.error('couldnt get a user', err)
    return res.status(500).send(err)
  })
})

router.post('/:id/claim', function (req, res, next) {
  console.log('post', req.body)
  db.Gifts.update({claim: true}, {where: {id: req.body.giftid}, include: [{model: db.Serie}]}).then(pregift => {
    if (pregift[0] !== 1) {
      return res.status(401).end('No gift updated')
    }
    db.Gifts.findOne({where: {id: req.body.giftid}, include: [ {model: db.Serie}, {model: db.User, attributes: ['name', 'id', 'email']} ]}).then(gift => {
      if (!gift) {
        return res.status(401).end('No gift found after')
      }
      db.User.findOne({where: {id: req.body.userid}}).then(user => {
        return user.addSerie(gift.Serie, {through: { pay: gift.pay, status: 'paid' }}).then(() => {
          app.mailer.send('claim', {
            to: gift.User.email,
            subject: 'Your gift was claim in TRTTV',
            user: gift.User,
            serie: gift.Serie
          }, function (err) {
            if (err) {
              console.log('There was an error sending the email', err)
              return res.status(500).send(err)
            }
          })
          return res.status(200).end()
        }).catch(function (err) {
          console.error('couldnt add serie to user', err)
          return res.status(500).send(err)
        })
      }).catch(function (err) {
        console.error('couldnt get user', err)
        return res.status(500).send(err)
      })
    })
    .catch(function (err) {
      return res.status(500).send(err)
    })
  })
  .catch(function (err) {
    console.error('couldnt get gift', err)
    return res.status(500).send(err)
  })
})

router.post('/:id/rating', function (req, res, next) {
  console.log('post', req.body)
  db.User.findOne({ where: {id: req.params.id}, include: [db.Serie]}).then(user => {
    if (!user) {
      return res.status(401).end('No user found')
    }
    const serie = user.Series.filter((serie) => serie.id === req.body.serieid)
    return user.addSerie(serie, { through: { stars: req.body.rate }}).then(() => {
      return res.status(200).end()
    }).catch(function (err) {
      console.error('couldnt associate serie to user', err)
      return res.status(500).send(err)
    })
  })
  .catch(function (err) {
    console.error('couldnt get user', err)
    return res.status(500).send(err)
  })
})

router.post('/:id/emailChange', function (req, res, next) {
  console.log('post', req.body)
  db.Gifts.update({email: req.body.email}, { where: {id: req.body.giftid}, returning: true }).then(gift => {
    if (gift[0] !== 1) {
      return res.status(401).end('No gift updated')
    }
    return gift[1][0].getUser().then(user => {
      return gift[1][0].getSerie().then(serie => {
        app.mailer.send('agift', {
          to: req.body.email,
          subject: 'You have a gift from  TRTTV',
          user: user,
          serie: serie
        }, function (err) {
          if (err) {
            console.log('There was an error sending the email', err)
            return res.status(500).send(err)
          } else {
            return res.status(200).end()
          }
        })
      })
      .catch(function (err) {
        console.error('couldnt get serie from Gift', err)
        return res.status(500).send(err)
      })
    })
    .catch(function (err) {
      console.error('couldnt get user from Gift', err)
      return res.status(500).send(err)
    })
  })
  .catch(function (err) {
    console.error('couldnt update Gift', err)
    return res.status(500).send(err)
  })
})

router.post('/:id', function (req, res, next) {
  console.log('post', req.body, req.params.id)
  db.User.update(req.body, { where: {id: req.params.id} }).then(user => {
    // console.log('update: ', user)
    if (user[0] !== 1) {
      return res.status(401).end('No user found')
    }
    db.User.findOne({ where: {id: req.params.id} }).then(user => {
        // console.log('response: ', user)
      if (!user) {
        return res.status(401).end('No user found')
      }
      return res.status(200).send(JSON.stringify(user, null, 2))
    })
      .catch(function (err) {
        console.error('couldnt get a user', err)
        return res.status(500).send(err)
      })
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

module.exports = router
