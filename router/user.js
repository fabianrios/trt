var express = require('express')
var router = express.Router()

router.get('/:id', function (req, res, next) {
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

router.post('/:id', function (req, res, next) {
  console.log(req.body, req.params.id)
  db.User.update(req.body, { where: {id: req.params.id} }).then(user => {
    console.log('response: ', user)
    if (!user) {
      return res.status(401).end('No user found')
    }
    return res.status(200).send(JSON.stringify(user, null, 2))
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

module.exports = router
