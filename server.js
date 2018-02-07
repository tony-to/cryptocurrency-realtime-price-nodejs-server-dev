var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


var routes = require('./api/routes/ApiRoutes'); //importing route
routes(app);

app.listen(port);
console.log('Pair RESTful API server started on: ' + port);