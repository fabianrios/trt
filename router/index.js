var express = require('express');
var router = express.Router();

router.get('/call', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).send(JSON.stringify({user: 'fabian'}, null, 2));
});

module.exports = router;
