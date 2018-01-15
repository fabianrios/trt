var express = require('express')
var router = express.Router()
const db = require('../models')

router.post('/:id/update', function (req, res, next) {
  // console.log('post', req.body)
  db.Serie.update(req.body, { where: {id: req.params.id}, returning: true }).then(serie => {
    console.log('update: ', serie)
    if (!serie[1][0]) {
      return res.status(401).end('No post updated')
    }
    return res.status(200).send(serie[1][0])
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

router.get('/:id/episodes', function (req, res, next) {
  db.Serie.findOne({ where: {id: req.params.id}}).then(serie => {
    if (!serie) {
      return res.status(401).end('No serie found')
    }
    serie.getEpisodes().then(episodes => {
      if (!episodes) {
        return res.status(401).end('No episodes found')
      }
      return res.status(200).send(episodes)
    })
    .catch(function (err) {
      console.error('couldnt update user', err)
      return res.status(500).send(err)
    })
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

router.get('/:id', function (req, res, next) {
  db.Serie.findOne({ where: {id: req.params.id}, include: [db.Episode]}).then(serie => {
    if (!serie) {
      return res.status(401).end('No serie found')
    }
    return res.status(200).send(serie)
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

router.post('/', function (req, res, next) {
  // console.log('post', req.body)
  db.Serie.create(req.body).then(post => {
    console.log('create: ', post)
    if (!post) {
      return res.status(401).end('No post created')
    }
    return res.status(200).send(post)
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

router.get('/', function (req, res, next) {
  db.Serie.findAll().then(post => {
    // console.log('all of them: ', post)
    if (!post) {
      return res.status(401).end('No post created')
    }
    return res.status(200).send(post)
  })
  .catch(function (err) {
    console.error('couldnt update user', err)
    return res.status(500).send(err)
  })
})

module.exports = router
