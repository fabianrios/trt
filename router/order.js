var express = require('express')
var router = express.Router()
const db = require('../models')
const Mollie = require("mollie-api-node");

mollie = new Mollie.API.Client;
mollie.setApiKey(process.env.MOLLIE_API);

router.post('/webhook', function (req, res, next) {
  const id = req.body.id
  console.log('webhook: ', req.body, id)
  if (!id){
    return response.end();
  } else {
    mollie.payments.get(id, function(payment) {
      if (payment.error) {
        console.error(payment.error);
        return response.end();
      }
      if (payment.isPaid()) {
        /*
          At this point you'd probably want to start the process of delivering the
          product to the customer.
        */
        console.log('paid')
      } else if (!payment.isOpen()) {
        console.log('no paid, not open')
        /*
          The payment isn't paid and isn't open anymore. We can assume it was
          aborted.
        */
      }
    })
    return res.status(200).end()
  }
})

router.get('/:id', function (req, res, next) {
  console.log('id', req.params.id)
  
  return res.status(200).send(req.params.id)
})

router.get('/:money/:des/:episodes/:user/create', function (req, res, next) {
  const m = parseFloat(req.params.money).toFixed(2)
  if (m === "NaN"){
    res.status(401).end(JSON.stringify({error: 'wrong decimal format for currency'}))
  }
  const d = req.params.des
  const e = req.params.episodes
  const u = req.params.user

  console.log(`http://${req.headers.host}/order/webhook/`)
  mollie.payments.create({
    amount:      m,
    description: d,
    redirectUrl: `http://${req.headers.host}/order/${u}_${d}_${e}/`,
    webhookUrl:  `http://www.trt-tv.eu/order/webhook/`,
    metadata: {
        orderId: `${u}_${d}_${e}`
    }
  },  function (payment) {
    if (payment.error) {
        console.error('error', payment.error);
        return res.end();
    }
    console.log('ps: ', payment)
    res.writeHead(302, {
        Location: payment.getPaymentUrl()
    });
    return res.end();
  });
})

module.exports = router
