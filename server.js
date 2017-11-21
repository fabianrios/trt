// initate 3rd parties and express server
const express = require('express'),
      path = require('path'),
      serveStatic = require('serve-static'),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize'),
      cors = require('cors');

// declaring the routes
var router = require('./router/index');

var corsOptions = {
origin: ['https://trtvseries.herokuapp.com','http://localhost:8080'],
optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(serveStatic(__dirname + "/dist"));
// use routes
app.use('/api', router);
var port = process.env.PORT || 5000;


const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});


module.exports = app;