var express = require('express')
var router = express.Router()
const db = require('../models')

router.get('/:id', function (req, res, next) {
  db.User.findOne({ where: {id: req.params.id},
    include: [{
      model: db.Episode,
      through: {
        where: {status: 'paid'}
      }
    },
    {
      model: db.Serie,
      through: {
        where: {status: 'paid'}
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

router.post('/:id/rating', function (req, res, next) {
  console.log('post', req.body)
  db.User.findOne({ where: {id: req.params.id}, include: [db.Serie]}).then(user => {
    if (!user) {
      return res.status(401).end('No user found')
    }
    const serie = user.Series.filter((serie) => serie.id === req.body.serieid)
    user.addSerie(serie, { through: { stars: req.body.rate }}).then(() => {
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

router.post('/:id', function (req, res, next) {
  console.log("post", req.body, req.params.id)
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
