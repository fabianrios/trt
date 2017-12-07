var express = require('express')
var router = express.Router()
const db = require('../models')

router.get('/:id', function (req, res, next) {
  console.log("req.params", req.params)
  db.User.findOne({ where: {id: req.params.id} }).then(user => {
    console.log('response: ', user)
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

router.post('/:id', function (req, res, next) {
  console.log("post", req.body, req.params.id)
  db.User.update(req.body, { where: {id: req.params.id} }).then(user => {
    console.log('update: ', user)
    if (!user) {
      return res.status(401).end('No user found')
    }
    db.User.findOne({ where: {id: user} }).then(user => {
        console.log('response: ', user)
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
