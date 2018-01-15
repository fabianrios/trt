var express = require('express')
var router = express.Router()
const db = require('../models')
const Mollie = require("mollie-api-node");

mollie = new Mollie.API.Client;
mollie.setApiKey(process.env.MOLLIE_API);

router.post('/webhook', function (req, res, next) {
  const id = req.body.id
  console.log('webhook: ', req.body, id);
  if (!id){
    return res.status(400).end()
  } else {
    mollie.payments.get(id, function (payment) {
      if (payment.error) {
        console.error(payment.error)
        return res.status(400).end()
      }
      console.log(payment)
      if (payment.isPaid()) {
        
        const u = payment.metadata.user
        const s = payment.metadata.serie
        db.Serie.findOne({ where: {id: s}, include: [db.Episode]}).then(serie => {
          if (!serie) {
            return res.status(401).end('No serie found')
          }
          db.User.findOne({ where: {id: u }}).then(user => {
            if (!user) {
              return res.status(401).end('No user found')
            }
            user.addEpisode(serie.Episodes).then(() => {
              return res.status(200).end()
            }).catch(function (err) {
              console.error('couldnt associate episode to user', err)
              return res.status(500).send(err)
            })
          }).catch(function (err) {
            console.error('couldnt get a user', err)
            return res.status(500).send(err)
          })
        })
        .catch(function (err) {
          console.error('couldnt get serie', err)
          return res.status(500).send(err)
        })
        console.log('paid')
      } else if (!payment.isOpen()) {
        /*
          The payment isn't paid and isn't open anymore. We can assume it was
          aborted.
        */
      }
    })
  }
})

router.get('/:id', function (req, res, next) {
  console.log('id', req.params.id)
  
  return res.status(200).send(req.params.id)
})

router.get('/:episode/:user/episode_create', function (req, res, next) {
  const e = parseInt(req.params.episode, 10)
  const u = parseInt(req.params.user, 10)
  db.Episode.findOne({ where: {id: e}}).then(episode => {
    if (!episode) {
      return res.status(401).end('No episode found')
    }
    db.User.findOne({ where: {id: u }}).then(user => {
      if (!user) {
        return res.status(401).end('No user found')
      }
      const meta = {
        orderId: `${u}_${e}`,
        user: u,
        episode: episode.id
      }
      console.log('meta', meta)
      mollie.payments.create({
        amount: episode.price,
        description: episode.name,
        redirectUrl: `http://${req.headers.host}/profile/${u}?episode_id=${episode.id}`,
        webhookUrl: `http://www.trt-tv.eu/order/webhook/`,
        metadata: meta
      }, function (payment) {
        if (payment.error) {
          console.error('error', payment.error)
          return res.end()
        }
        console.log('ps: ', payment)
        user.addEpisode(episode, { through: { status: payment.status, pay: payment.id }}).then(() => {
          res.writeHead(302, {
            Location: payment.getPaymentUrl()
          })
          return res.end()
        }).catch(function (err) {
          console.error('couldnt associate episode to user', err)
          return res.status(500).send(err)
        })
      })
    }).catch(function (err) {
      console.error('couldnt get the user', err)
      return res.status(500).send(err)
    })
  }).catch(function (err) {
    console.error('couldnt get the episode', err)
    return res.status(500).send(err)
  })
})

router.get('/:serie/:user/create', function (req, res, next) {
  // const m = parseFloat(req.params.money).toFixed(2)
  const s = req.params.serie
  const u = parseInt(req.params.user, 10)
  // money needs to be retrieve from DB not easy change in the url call
  db.Serie.findOne({ where: {id: s}}).then(serie => {
    if (!serie) {
      return res.status(401).end('No serie found')
    }
    db.User.findOne({ where: {id: u }}).then(user => {
      if (!user) {
        return res.status(401).end('No user found')
      }
      const meta = {
        orderId: `${u}_${s}`,
        user: u,
        serie: serie.id
      }
      mollie.payments.create({
        amount: serie.price,
        description: serie.name,
        redirectUrl: `http://${req.headers.host}/profile/${u}?serie_id=${s}`,
        webhookUrl: `http://www.trt-tv.eu/order/webhook/`,
        metadata: meta
      }, function (payment) {
        if (payment.error) {
          console.error('error', payment.error)
          return res.end()
        }
        console.log('ps: ', payment)
        user.addSerie(serie, { through: { status: payment.status, pay: payment.id }}).then(() => {
          res.writeHead(302, {
            Location: payment.getPaymentUrl()
          })
          return res.end()
        }).catch(function (err) {
          console.error('couldnt associate episode to user', err)
          return res.status(500).send(err)
        })
      })
    }).catch(function (err) {
      console.error('couldnt get a user', err)
      return res.status(500).send(err)
    })
  })
  .catch(function (err) {
    console.error('couldnt get serie', err)
    return res.status(500).send(err)
  })
})

module.exports = router