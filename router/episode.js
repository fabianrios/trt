var express = require('express')
var router = express.Router()
const db = require('../models')

router.post('/:id/update', function (req, res, next) {
  console.log('post', req.body)
  db.Episode.update(req.body, { where: {id: req.params.id}, returning: true }).then(episode => {
    console.log('update: ', episode)
    if (!episode[1][0]) {
      return res.status(401).end('No episode updated')
    }
    return res.status(200).send(episode[1][0])
  })
  .catch(function (err) {
    console.error('couldnt update episode', err)
    return res.status(500).send(err)
  })
})

router.post('/', function (req, res, next) {
  console.log('post', req.body)
  db.Episode.create(req.body).then(episode => {
    console.log('create: ', episode)
    if (!episode) {
      return res.status(401).end('No episode created')
    }
    return res.status(200).send(episode)
  })
  .catch(function (err) {
    console.error('couldnt update episode', err)
    return res.status(500).send(err)
  })
})

router.get('/', function (req, res, next) {
  db.Episode.findAll().then(post => {
    console.log('all of them: ', post)
    if (!post) {
      return res.status(401).end('No episode created')
    }
    return res.status(200).send(post)
  })
  .catch(function (err) {
    console.error('couldnt update episode', err)
    return res.status(500).send(err)
  })
})

router.get('/:id', function (req, res, next) {
  db.Episode.findOne({where: {id: req.params.id}}).then(post => {
    console.log('one episode: ', post)
    if (!post) {
      return res.status(401).end('No episode found')
    }
    return res.status(200).send(post)
  })
  .catch(function (err) {
    console.error('couldnt get episode', err)
    return res.status(500).send(err)
  })
})

module.exports = router
